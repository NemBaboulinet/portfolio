import { useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import type { Project } from '../data/projects';

const RADIUS = 420;
const ARC_CENTER_X = -70;
const LABEL_OFFSET_X = 26;
const STEP_DEG = 13;
const MAX_DISTANCE = 3;
const WHEEL_COOLDOWN_MS = 350;

interface ProjectDialProps {
	projects: Project[];
	active: number;
	onSelect: (index: number) => void;
	/** -1 : projet précédent, 1 : projet suivant */
	onStep: (delta: -1 | 1) => void;
}

export default function ProjectDial({
	projects,
	active,
	onSelect,
	onStep,
}: ProjectDialProps) {
	const arcRef = useRef<HTMLElement>(null);
	const lastWheelRef = useRef(0);

	// Listener natif : React attache onWheel en mode passif, donc
	// preventDefault() n'empêcherait pas la page de défiler.
	useEffect(() => {
		const arc = arcRef.current;
		if (!arc) return;
		const onWheel = (event: WheelEvent) => {
			event.preventDefault();
			const now = Date.now();
			if (now - lastWheelRef.current < WHEEL_COOLDOWN_MS) return;
			lastWheelRef.current = now;
			onStep(event.deltaY > 0 ? 1 : -1);
		};
		arc.addEventListener('wheel', onWheel, { passive: false });
		return () => arc.removeEventListener('wheel', onWheel);
	}, [onStep]);

	function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
			event.preventDefault();
			onStep(-1);
		} else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
			event.preventDefault();
			onStep(1);
		}
	}

	return (
		<>
			{/* Cadran en arc (desktop) */}
			<nav
				ref={arcRef}
				aria-label="Projets"
				onKeyDown={handleKeyDown}
				className="hidden md:block relative shrink-0 w-140 h-full overflow-hidden"
			>
				<div
					aria-hidden="true"
					className="absolute rounded-full border border-lime-accent/30"
					style={{
						width: RADIUS * 2,
						height: RADIUS * 2,
						left: ARC_CENTER_X - RADIUS,
						top: `calc(50% - ${RADIUS}px)`,
					}}
				/>
				<div
					aria-hidden="true"
					className="absolute top-1/2 w-9 h-px bg-lime-accent"
					style={{ left: ARC_CENTER_X + RADIUS - 18 }}
				/>
				{projects.map((project, i) => {
					const distance = i - active;
					const distanceAbs = Math.abs(distance);
					const visible = distanceAbs <= MAX_DISTANCE;
					const deg = distance * STEP_DEG;
					const rad = (deg * Math.PI) / 180;
					return (
						<button
							key={project.id}
							type="button"
							onClick={() => onSelect(i)}
							aria-current={distance === 0}
							tabIndex={visible ? 0 : -1}
							className={`absolute flex items-baseline gap-2.5 py-1.5 whitespace-nowrap origin-left cursor-pointer transition-all duration-400 ${
								distance === 0
									? 'text-lime-accent'
									: 'text-white'
							}`}
							style={{
								left:
									ARC_CENTER_X +
									RADIUS * Math.cos(rad) +
									LABEL_OFFSET_X,
								top: `calc(50% + ${RADIUS * Math.sin(rad)}px)`,
								transform: `translateY(-50%) rotate(${deg}deg)`,
								opacity: visible
									? Math.max(0.2, 1 - distanceAbs * 0.22)
									: 0,
								pointerEvents: visible ? 'auto' : 'none',
							}}
						>
							<span className="font-mono text-xs tracking-widest w-8 text-left">
								{String(i + 1).padStart(2, '0')}
							</span>
							<span className="font-semibold text-2xl lg:text-3xl tracking-tight">
								{project.short}
							</span>
						</button>
					);
				})}
				<div className="absolute left-16 bottom-12 flex gap-7 text-sm text-lime-accent">
					<button
						type="button"
						onClick={() => onStep(-1)}
						aria-label="Projet précédent"
						className="py-2 cursor-pointer"
					>
						← Tourner
					</button>
					<button
						type="button"
						onClick={() => onStep(1)}
						aria-label="Projet suivant"
						className="py-2 cursor-pointer"
					>
						Tourner →
					</button>
				</div>
			</nav>

			{/* Rangée défilable (mobile) */}
			<nav
				aria-label="Projets"
				onKeyDown={handleKeyDown}
				className="md:hidden shrink-0 flex gap-5 overflow-x-auto px-4 pt-6 pb-3 border-b border-white/10"
			>
				{projects.map((project, i) => (
					<button
						key={project.id}
						type="button"
						onClick={() => onSelect(i)}
						aria-current={i === active}
						className={`shrink-0 whitespace-nowrap font-semibold text-lg cursor-pointer ${
							i === active ? 'text-lime-accent' : 'text-white/60'
						}`}
					>
						{project.short}
					</button>
				))}
			</nav>
		</>
	);
}
