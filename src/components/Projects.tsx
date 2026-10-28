import { useCallback, useState } from 'react';
import { PROJECTS } from '../data/projects';
import ProjectDial from './ProjectDial';
import ProjectPreview from './ProjectPreview';
import { TextContent } from './TextStyle';

export default function Projects() {
	const [active, setActive] = useState(0);

	const step = useCallback(
		(delta: -1 | 1) =>
			setActive((i) => (i + delta + PROJECTS.length) % PROJECTS.length),
		[],
	);

	const current = PROJECTS[active];
	if (!current) return null;

	return (
		<div className="w-full lg:h-dvh overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row lg:items-center lg:gap-14 lg:pr-20">
			<ProjectDial
				projects={PROJECTS}
				active={active}
				onSelect={setActive}
				onStep={step}
			/>

			<article className="flex-1 min-w-0 px-4 lg:px-0 py-3 lg:py-0">
				<ProjectPreview
					key={current.id}
					media={current.preview}
					label={current.name}
				/>
				<p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55 mt-3 sm:mt-6 mb-2 sm:mb-3">
					{current.stack}
				</p>
				{/* Pas H3 : trop grand pour des noms de projet longs */}
				<h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
					{current.name}
				</h3>
				<TextContent className="mt-2 sm:mt-4">
					{current.desc}
				</TextContent>
				<div className="mt-3 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 max-w-140 flex flex-wrap items-center gap-x-8 gap-y-2">
					{current.link ? (
						<a
							href={current.link.href}
							target="_blank"
							rel="noreferrer noopener"
							className="text-lime-accent underline underline-offset-4 hover:text-white transition-colors"
						>
							{current.link.label} →
						</a>
					) : (
						<span className="text-white/55">
							Projet protégé · code non public
						</span>
					)}
					<span className="font-mono text-xs uppercase text-white/55">
						{current.period}
					</span>
				</div>
			</article>
		</div>
	);
}
