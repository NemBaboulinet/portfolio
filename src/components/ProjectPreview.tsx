import { useEffect, useRef, useState } from 'react';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import type { ProjectPreviewMedia } from '../data/projects';

interface ProjectPreviewProps {
	media?: ProjectPreviewMedia;
	label: string;
}

const prefersReducedMotion = () =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ProjectPreview({ media, label }: ProjectPreviewProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [paused, setPaused] = useState(prefersReducedMotion);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (paused) video.pause();
		else video.play().catch(() => setPaused(true));
	}, [paused]);

	return (
		<>
			<div className="relative w-3/5 sm:w-full max-w-140 aspect-16/10 bg-black/40 border-t border-lime-accent/35 overflow-hidden">
				{media ? (
					<>
						<video
							ref={videoRef}
							className="size-full object-cover"
							poster={media.poster}
							muted
							loop
							playsInline
							preload="metadata"
						>
							<source src={media.webm} type="video/webm" />
							<source src={media.mp4} type="video/mp4" />
						</video>
						<button
							type="button"
							onClick={() => setPaused((p) => !p)}
							aria-label={
								paused ? 'Lire la vidéo' : 'Mettre en pause'
							}
							className="absolute right-3 bottom-3 size-9 grid place-items-center rounded-full bg-black/60 text-lime-accent hover:bg-black/80 transition-colors cursor-pointer"
						>
							{paused ? (
								<CaretRightOutlined />
							) : (
								<PauseOutlined />
							)}
						</button>
					</>
				) : (
					<div className="size-full bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px] flex items-center justify-center">
						<span className="font-mono text-xs tracking-widest uppercase text-white/40">
							Pas d&apos;aperçu
						</span>
					</div>
				)}
			</div>
			<p className="hidden sm:block font-mono text-xs tracking-wider text-white/55 mt-3">
				{media?.caption ?? label}
			</p>
		</>
	);
}
