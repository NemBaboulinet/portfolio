// Génère dashboard.html : une page autonome avec les graphiques des visites.
// Reçoit les lignes des feuilles Excel (déjà agrégées par jour) et renvoie
// le HTML. Highcharts est chargé depuis un CDN, le reste est dans la page.

const HIGHCHARTS = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.4.8';

// Additionne les visiteurs par valeur d'une colonne (ex. Catégorie, Pays).
function sumBy(rows, column) {
	const totals = new Map();
	for (const row of rows) {
		const name = row[column] ?? '(inconnu)';
		totals.set(name, (totals.get(name) ?? 0) + (row.Visiteurs ?? 0));
	}
	return [...totals].sort((a, b) => b[1] - a[1]);
}

export function buildDashboard({ jours, sources, pays, generated, since, until }) {
	const data = {
		generated,
		since,
		until,
		jours: jours
			.map((r) => ({
				d: r.Date,
				v: r.Visiteurs ?? 0,
				p: r['Pages vues'] ?? 0,
			}))
			.sort((a, b) => a.d.localeCompare(b.d)),
		sources: sumBy(sources, 'Catégorie'),
		pays: sumBy(pays, 'Pays'),
	};
	// "<" échappé pour qu'aucune valeur ne puisse fermer la balise <script>.
	const json = JSON.stringify(data).replace(/</g, '\\u003c');

	return `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>Visiteurs - kevinbytebier.fr</title>
<style>
  :root { --bg:#000; --card:#0a0c07; --line:#ffffff1a; --text:#e8e8e8; --muted:#ffffffa6; --accent:#9be800; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--text); font-family:system-ui,sans-serif; }
  main { max-width:72rem; margin:0 auto; padding:1.5rem 1rem 3rem; }
  h1 { color:var(--accent); font-size:1.5rem; margin:0 0 .25rem; }
  h2 { font-size:1rem; margin:0 0 1rem; color:#fff; }
  .sub { color:var(--muted); font-size:.85rem; margin:0 0 1.5rem; }
  .kpis { display:grid; grid-template-columns:repeat(auto-fit,minmax(10rem,1fr)); gap:.75rem; margin-bottom:1rem; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:.75rem; padding:1rem; }
  .kpi b { display:block; font-size:1.75rem; color:var(--accent); }
  .kpi span { color:var(--muted); font-size:.8rem; }
  .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(18rem,1fr)); gap:1rem; margin-top:1rem; }
  .wide { grid-column:1/-1; }
  .box { position:relative; height:18rem; }
  .wide .box { height:20rem; }
</style>
</head>
<body>
<main>
  <h1>Visiteurs - kevinbytebier.fr</h1>
  <p class="sub" id="sub"></p>
  <section class="kpis" id="kpis"></section>
  <section class="grid">
    <div class="card wide"><h2>Visiteurs par jour</h2><div class="box" id="jours"></div></div>
    <div class="card"><h2>Provenance des visiteurs</h2><div class="box" id="sources"></div></div>
    <div class="card"><h2>Pays des visiteurs</h2><div class="box" id="pays"></div></div>
  </section>
</main>
<script src="${HIGHCHARTS}/highcharts.js"></script>
<script src="${HIGHCHARTS}/modules/accessibility.min.js"></script>
<script>
var DATA = ${json};
var COLORS = { 'Direct':'#6b7280', 'Google':'#9be800', 'LinkedIn':'#38bdf8', 'Facebook':'#a78bfa', 'GitHub':'#f5f5f5', 'Autre':'#f59e0b' };
var PALETTE = ['#9be800','#38bdf8','#a78bfa','#f59e0b','#f472b6','#2dd4bf','#6b7280'];

Highcharts.setOptions({
  chart: { backgroundColor: 'transparent', style: { fontFamily: 'system-ui, sans-serif' } },
  title: { text: null },
  lang: { thousandsSep: ' ' },
  legend: { itemStyle: { color: '#ffffffa6' }, itemHoverStyle: { color: '#fff' } },
  tooltip: { backgroundColor: '#0a0c07', borderColor: '#ffffff33', style: { color: '#e8e8e8' } },
  credits: { style: { color: '#ffffff66' } }
});

var days = DATA.jours;
var total = days.reduce(function (s, r) { return s + r.v; }, 0);
var pages = days.reduce(function (s, r) { return s + r.p; }, 0);
var best = days.reduce(function (b, r) { return r.v > b.v ? r : b; }, { v: -1, d: '-' });

document.getElementById('sub').textContent =
  'Du ' + DATA.since + ' au ' + DATA.until +
  ' - généré le ' + DATA.generated;

[
  [total, 'visiteurs (cumul des jours)'],
  [pages, 'pages vues'],
  [days.length ? (total / days.length).toFixed(1) : '0', 'visiteurs par jour en moyenne'],
  [best.v < 0 ? '-' : best.v, 'record, le ' + best.d]
].forEach(function (k) {
  var el = document.createElement('div');
  el.className = 'card kpi';
  var b = document.createElement('b');
  b.textContent = k[0];
  var span = document.createElement('span');
  span.textContent = k[1];
  el.append(b, span);
  document.getElementById('kpis').appendChild(el);
});

// Moyenne glissante sur 7 jours (moins si moins de jours disponibles).
var avg = days.map(function (r, i) {
  var window = days.slice(Math.max(0, i - 6), i + 1);
  var sum = window.reduce(function (s, x) { return s + x.v; }, 0);
  return Math.round((sum / window.length) * 10) / 10;
});

Highcharts.chart('jours', {
  xAxis: { categories: days.map(function (r) { return r.d; }), labels: { style: { color: '#ffffffa6' } }, lineColor: '#ffffff1a', tickColor: '#ffffff1a' },
  yAxis: { min: 0, allowDecimals: false, title: { text: null }, gridLineColor: '#ffffff1a', labels: { style: { color: '#ffffffa6' } } },
  tooltip: { shared: true },
  accessibility: { description: 'Visiteurs par jour, avec la moyenne sur 7 jours' },
  series: [
    { type: 'column', name: 'Visiteurs', data: days.map(function (r) { return r.v; }), color: '#9be800', borderWidth: 0 },
    { type: 'spline', name: 'Moyenne 7 jours', data: avg, color: '#f5f5f5', marker: { enabled: false }, lineWidth: 2 }
  ]
});

function pie(id, entries, colorFor, description) {
  Highcharts.chart(id, {
    accessibility: { description: description },
    tooltip: { pointFormat: '<b>{point.y}</b> visiteurs ({point.percentage:.0f} %)' },
    plotOptions: {
      pie: {
        innerSize: '55%',
        borderColor: '#0a0c07',
        showInLegend: true,
        dataLabels: { enabled: true, format: '{point.percentage:.0f} %', distance: 8, style: { color: '#e8e8e8', textOutline: 'none', fontWeight: 'normal' } }
      }
    },
    series: [{
      type: 'pie',
      name: 'Visiteurs',
      data: entries.map(function (e, i) { return { name: e[0], y: e[1], color: colorFor(e, i) }; })
    }]
  });
}

pie('sources', DATA.sources, function (e) { return COLORS[e[0]] || '#6b7280'; }, 'Répartition des visiteurs par provenance');

// Pays : codes ISO traduits en français, 6 plus gros puis « Autres ».
var names;
try { names = new Intl.DisplayNames(['fr'], { type: 'region' }); } catch (e) { names = null; }
var countries = DATA.pays.map(function (e) {
  var label = e[0];
  try { if (names && /^[A-Za-z]{2}$/.test(label)) label = names.of(label.toUpperCase()); } catch (e2) {}
  return [label, e[1]];
});
if (countries.length > 6) {
  var rest = countries.slice(6).reduce(function (s, e) { return s + e[1]; }, 0);
  countries = countries.slice(0, 6).concat([['Autres', rest]]);
}
pie('pays', countries, function (e, i) { return PALETTE[i % PALETTE.length]; }, 'Répartition des visiteurs par pays');
</script>
</body>
</html>
`;
}
