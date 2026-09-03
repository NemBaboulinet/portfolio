import { useEffect, useMemo, useRef, useState } from 'react';

export type SectionNavItem = {
	/** id de la section cible, sans le # */
	id: string;
	label: string;
	/** true si la section a un fond clair : la sidebar s'inverse */
	light?: boolean;
};

type SectionNavProps = {
	items: SectionNavItem[];
	/** conteneur scrollable ; omis => le viewport */
	scrollerRef?: React.RefObject<HTMLElement | null>;
	accent?: string;
	/** navigation au clavier flèches / page haut-bas */
	keyboard?: boolean;
};

export function SectionNav({
	items,
	scrollerRef,
	accent = '#9BE800',
	keyboard = true,
}: SectionNavProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hovered, setHovered] = useState<number | null>(null);
	const sectionsRef = useRef<HTMLElement[]>([]);

	const ids = useMemo(() => items.map((i) => i.id), [items]);

	// suit la section visible
	useEffect(() => {
		const root = scrollerRef?.current ?? null;
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => Boolean(el));
		sectionsRef.current = sections;
		if (!sections.length) return;

		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
						const index = ids.indexOf(entry.target.id);
						if (index >= 0) setActiveIndex(index);
					}
				});
			},
			{ root, threshold: [0.5, 0.75] },
		);
		sections.forEach((section) => io.observe(section));
		return () => io.disconnect();
	}, [ids, scrollerRef]);

	const goTo = (index: number) => {
		const target = sectionsRef.current[index];
		if (!target) return;
		const root = scrollerRef?.current;
		if (root) root.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
		else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	// flèches haut / bas
	useEffect(() => {
		if (!keyboard) return;
		const onKeyDown = (event: KeyboardEvent) => {
			const dir =
				event.key === 'ArrowDown' || event.key === 'PageDown'
					? 1
					: event.key === 'ArrowUp' || event.key === 'PageUp'
						? -1
						: 0;
			if (!dir) return;
			event.preventDefault();
			goTo(Math.min(items.length - 1, Math.max(0, activeIndex + dir)));
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [activeIndex, items.length, keyboard]);

	const onLight = Boolean(items[activeIndex]?.light);
	const activeColor = onLight ? '#0A0B0A' : accent;
	const idleBar = onLight ? 'rgba(10,11,10,0.35)' : '#3A4136';

	return (
		<nav
			aria-label="Navigation par sections"
			style={{
				position: 'fixed',
				right: 28,
				top: '50%',
				transform: 'translateY(-50%)',
				zIndex: 40,
				display: 'flex',
				flexDirection: 'column',
				gap: 16,
				alignItems: 'flex-end',
			}}
		>
			{items.map((item, index) => {
				const isActive = index === activeIndex;
				const showLabel = isActive || hovered === index;
				return (
					<a
						key={item.id}
						href={`#${item.id}`}
						aria-current={isActive ? 'true' : undefined}
						onMouseEnter={() => setHovered(index)}
						onMouseLeave={() => setHovered(null)}
						onClick={(event) => {
							event.preventDefault();
							goTo(index);
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							height: 8,
							textDecoration: 'none',
						}}
					>
						<span
							style={{
								fontFamily:
									"'JetBrains Mono', ui-monospace, monospace",
								fontSize: 9,
								letterSpacing: '0.14em',
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
								color: showLabel ? activeColor : 'transparent',
								transition: 'color .35s',
							}}
						>
							{item.label}
						</span>
						<span
							style={{
								width: isActive ? 22 : 6,
								height: 6,
								borderRadius: 3,
								background: isActive ? activeColor : idleBar,
								transition: 'width .35s, background .35s',
							}}
						/>
					</a>
				);
			})}
		</nav>
	);
}

/* --- usage ---
const scroller = useRef<HTMLDivElement>(null);

<div
  ref={scroller}
  style={{ height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
>
  <SectionNav
    scrollerRef={scroller}
    items={[
      { id: "hero", label: "Intro" },
      { id: "apropos", label: "À propos", light: true },
      { id: "projets", label: "Projets" },
      { id: "expertise", label: "Expertise", light: true },
      { id: "parcours", label: "Parcours" },
      { id: "contact", label: "Contact" },
    ]}
  />
  <section id="hero" style={{ height: "100vh", scrollSnapAlign: "start", scrollSnapStop: "always" }} />
</div>
*/
