import { useEffect, useState } from 'react';

type CommitProps = {
	sha: string;
	message: string;
	date: string;
	url: string;
};

type GithubCommitProps = {
	sha: string;
	html_url: string;
	commit: {
		message: string;
		author: { date: string } | null;
	};
};

const REPO = 'NemBaboulinet/portfolio';

export default function Changelog() {
	const [commits, setCommits] = useState<CommitProps[]>([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		let cancelled = false;

		fetch(`https://api.github.com/repos/${REPO}/commits?per_page=10`)
			.then((res) => {
				if (!res.ok) throw new Error('GithHub API error');
				return res.json() as Promise<GithubCommitProps[]>;
			})
			.then((data) => {
				if (cancelled) return;
				setCommits(
					data.map((c) => ({
						sha: c.sha.slice(0, 7),
						message: c.commit.message.split('\n')[0],
						date: c.commit.author?.date ?? '',
						url: c.html_url,
					})),
				);
			})
			.catch(() => {
				if (!cancelled) setError(true);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	if (error) {
		return (
			<>
				<h2 className="text-2xl font-bold text-white mb-4">
					Pour suivre l&apos;évolution de mon travail
				</h2>
				<p className="text-white/60">
					Changelog indisponible pour le moment.
				</p>
			</>
		);
	}

	return (
		<>
			<h2 className="text-2xl font-bold text-white mb-4">
				Pour suivre l&apos;évolution de mon travail
			</h2>
			<ul className=" flex flex-col gap-4 text-left max-w-2xl w-full border border-lime-400/60 rounded-lg p-4 sm:p-6 md:p-8 backdrop-blur-xl bg-accent/10">
				{commits.map((commit) => (
					<li
						key={commit.sha}
						className="flex flex-wrap items-baseline gap-3 text-white/80"
					>
						<span className="font-mono text-xs text-white/40">
							{commit.sha}
						</span>
						<a
							href={commit.url}
							target="_blank"
							rel="noreferrer"
							className="hover:text-white transition-colors min-w-0 break-words"
						>
							{commit.message}
						</a>
						<span className="ml-auto text-xs text-white/40 whitespace-nowrap">
							{commit.date
								? new Date(commit.date).toLocaleDateString(
										'fr-FR',
									)
								: ''}
						</span>
					</li>
				))}
			</ul>
		</>
	);
}
