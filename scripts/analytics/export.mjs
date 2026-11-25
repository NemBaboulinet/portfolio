// Exporte les analytics Vercel (visites, sources, pages, pays) vers un fichier
// Excel, en ajoutant ou mettant à jour jour par jour, puis génère le tableau
// de bord dashboard.html (voir dashboard.mjs).
//
// Usage : node export.mjs [--since AAAA-MM-JJ] [--from AAAA-MM-JJ]
// Sans --since : recalcule les 14 derniers jours (rattrape les jours manqués).

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';
import { buildDashboard } from './dashboard.mjs';

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(DIR, 'visiteurs.xlsx');
const DASHBOARD_FILE = join(DIR, 'dashboard.html');
const API = 'https://api.vercel.com/v1/query/web-analytics/visits/aggregate';

// ---------- 1. Configuration ----------

// Lit un fichier .env simple (CLE=valeur) sans dépendance.
function loadEnv(path) {
	if (!existsSync(path)) return;
	for (const line of readFileSync(path, 'utf8').split('\n')) {
		const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
		if (!match || process.env[match[1]] !== undefined) continue;
		process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
	}
}
loadEnv(join(DIR, '.env')); // sur le serveur
loadEnv(join(DIR, '../../.env.local')); // en local, dans le portfolio

const { VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_TEAM_SLUG } = process.env;
if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
	console.error('VERCEL_TOKEN et VERCEL_PROJECT_ID sont obligatoires.');
	process.exit(1);
}

// ---------- 2. Dates ----------

const toISO = (date) => date.toISOString().slice(0, 10);

function daysBetween(since, until) {
	const days = [];
	for (
		let d = new Date(`${since}T00:00:00Z`);
		toISO(d) <= until;
		d.setUTCDate(d.getUTCDate() + 1)
	) {
		days.push(toISO(d));
	}
	return days;
}

const sinceArg = process.argv.indexOf('--since');
const today = toISO(new Date());
const since =
	sinceArg > -1
		? process.argv[sinceArg + 1]
		: toISO(new Date(Date.now() - 14 * 86400000));

// --from : début de la période affichée dans le dashboard (défaut : --since).
// Le fichier Excel garde tout l'historique, seul le dashboard est filtré.
const fromArg = process.argv.indexOf('--from');
const from = fromArg > -1 ? process.argv[fromArg + 1] : since;

// ---------- 3. Appel à l'API Vercel ----------

async function query(day, by) {
	const params = new URLSearchParams({
		projectId: VERCEL_PROJECT_ID,
		// Heures explicites : avec une simple date, l'API renvoie une fenêtre vide
		// pour les dimensions autres que « day ».
		since: `${day}T00:00:00Z`,
		until: `${day}T23:59:59Z`,
		limit: '100',
	});
	if (VERCEL_TEAM_SLUG) params.set('slug', VERCEL_TEAM_SLUG);
	params.set('by', by);

	const response = await fetch(`${API}?${params}`, {
		headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
	});
	if (!response.ok) {
		throw new Error(`API ${response.status} : ${await response.text()}`);
	}
	return (await response.json()).data ?? [];
}

// ---------- 4. Catégories de sources ----------

function category(host) {
	const h = (host ?? '').toLowerCase();
	if (!h || h === 'direct') return 'Direct';
	if (h.includes('google')) return 'Google';
	if (h.includes('linkedin') || h === 'lnkd.in') return 'LinkedIn';
	if (/facebook|fb\.com|fb\.me/.test(h)) return 'Facebook';
	if (h.includes('github')) return 'GitHub';
	return 'Autre';
}

// ---------- 5. Description des feuilles ----------
// by : dimension demandée à l'API (obligatoire ; « day » = total du jour)
// fillEmpty : écrit une ligne à 0 si l'API ne renvoie rien ce jour-là
// key : colonnes qui identifient une ligne (pour ne pas créer de doublon)

const SHEETS = [
	{
		name: 'Jours',
		fillEmpty: true,
		by: 'day',
		columns: ['Date', 'Visiteurs', 'Pages vues'],
		key: ['Date'],
		row: (day, r) => ({
			Date: day,
			Visiteurs: r.visitors,
			'Pages vues': r.pageviews,
		}),
	},
	{
		name: 'Sources',
		by: 'referrerHostname',
		columns: ['Date', 'Domaine', 'Catégorie', 'Visiteurs', 'Pages vues'],
		key: ['Date', 'Domaine'],
		row: (day, r) => ({
			Date: day,
			Domaine: r.referrerHostname || '(direct)',
			Catégorie: category(r.referrerHostname),
			Visiteurs: r.visitors,
			'Pages vues': r.pageviews,
		}),
	},
	{
		name: 'Pages',
		by: 'requestPath',
		columns: ['Date', 'Page', 'Visiteurs', 'Pages vues'],
		key: ['Date', 'Page'],
		row: (day, r) => ({
			Date: day,
			Page: r.requestPath,
			Visiteurs: r.visitors,
			'Pages vues': r.pageviews,
		}),
	},
	{
		name: 'Pays',
		by: 'country',
		columns: ['Date', 'Pays', 'Visiteurs', 'Pages vues'],
		key: ['Date', 'Pays'],
		row: (day, r) => ({
			Date: day,
			Pays: r.country || '(inconnu)',
			Visiteurs: r.visitors,
			'Pages vues': r.pageviews,
		}),
	},
];

// ---------- 6. Lecture et écriture du fichier Excel ----------

// Relit les lignes déjà présentes dans une feuille (si elle existe).
function readRows(workbook, sheet) {
	const existing = workbook.getWorksheet(sheet.name);
	const rows = new Map();
	if (!existing) return rows;
	existing.eachRow((row, index) => {
		if (index === 1) return; // en-têtes
		const obj = {};
		sheet.columns.forEach(
			(col, i) => (obj[col] = row.getCell(i + 1).value),
		);
		if (obj.Date instanceof Date) obj.Date = toISO(obj.Date);
		rows.set(sheet.key.map((k) => obj[k]).join('|'), obj);
	});
	return rows;
}

// Réécrit toute la feuille, triée par date croissante (ordre idéal pour un
// graphique), puis par visiteurs décroissants. La colonne Date contient de
// vraies dates Excel, pas du texte : un graphique les reconnaît comme un axe
// de temps.
function writeSheet(workbook, sheet, rows) {
	const old = workbook.getWorksheet(sheet.name);
	if (old) workbook.removeWorksheet(old.id);
	const ws = workbook.addWorksheet(sheet.name);
	ws.columns = sheet.columns.map((header) => ({
		header,
		key: header,
		width: header === 'Page' || header === 'Domaine' ? 36 : 16,
	}));
	ws.getColumn('Date').numFmt = 'yyyy-mm-dd';
	ws.autoFilter = {
		from: { row: 1, column: 1 },
		to: { row: 1, column: sheet.columns.length },
	};
	ws.getRow(1).font = { bold: true };
	ws.views = [{ state: 'frozen', ySplit: 1 }];
	const sorted = [...rows.values()].sort(
		(a, b) =>
			String(a.Date).localeCompare(String(b.Date)) ||
			(b.Visiteurs ?? 0) - (a.Visiteurs ?? 0),
	);
	sorted.forEach((row) =>
		ws.addRow({ ...row, Date: new Date(`${row.Date}T00:00:00Z`) }),
	);
}

// ---------- 7. Programme principal ----------

const workbook = new ExcelJS.Workbook();
if (existsSync(OUT_FILE)) await workbook.xlsx.readFile(OUT_FILE);

const days = daysBetween(since, today);
console.log(`Export du ${since} au ${today} (${days.length} jours)`);

const allRows = {};
for (const sheet of SHEETS) {
	const rows = readRows(workbook, sheet);
	for (const day of days) {
		// On remplace toutes les lignes du jour, pour éviter les valeurs périmées.
		for (const [key, row] of rows) if (row.Date === day) rows.delete(key);
		const data = await query(day, sheet.by);
		// Jour sans visite : l'API ne renvoie rien, on écrit une ligne à 0.
		if (sheet.fillEmpty && data.length === 0) {
			data.push({ visitors: 0, pageviews: 0 });
		}
		for (const r of data) {
			const row = sheet.row(day, r);
			rows.set(sheet.key.map((k) => row[k]).join('|'), row);
		}
	}
	writeSheet(workbook, sheet, rows);
	allRows[sheet.name] = [...rows.values()];
	console.log(`  ${sheet.name} : ${rows.size} lignes`);
}

await workbook.xlsx.writeFile(OUT_FILE);
console.log(`Écrit : ${OUT_FILE}`);

const inPeriod = (rows) => rows.filter((r) => r.Date >= from && r.Date <= today);

writeFileSync(
	DASHBOARD_FILE,
	buildDashboard({
		jours: inPeriod(allRows.Jours),
		sources: inPeriod(allRows.Sources),
		pays: inPeriod(allRows.Pays),
		generated: today,
		since: from,
		until: today,
	}),
);
console.log(`Écrit : ${DASHBOARD_FILE}`);
