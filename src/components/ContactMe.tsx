import { Citation, H3, SubTitle } from './TextStyle';
import { CardWindow, Placeholder, Pin } from './CardWindow';

export default function ContactMe() {
	return (
		<>
			<H3>Travaillons ensemble</H3>
			<Citation>Une alternance, une idée, un projet ?</Citation>
			<div>
				<CardWindow
					title={
						<>
							<svg
								className="size-4 fill-none text-lime-accent shrink-0"
								viewBox="0 0 16 16"
							>
								<circle
									className="stroke-current stroke-[1.5]"
									cx="8"
									cy="8"
									r="6.5"
								/>
								<circle
									className="fill-current"
									cx="8"
									cy="8"
									r="2"
								/>
							</svg>
							<span className="text-sm text-white/75">
								Nouvelle issue
							</span>
							<Pin className="text-lime-accent bg-lime-accent/15 text-[11px] uppercase">
								Ouvert
							</Pin>
						</>
					}
				>
					<SubTitle>Titre</SubTitle>

					<Placeholder>
						<span className="text-white">
							Discutons de votre prochain projet
						</span>
					</Placeholder>

					<SubTitle>Description</SubTitle>

					<Placeholder>
						<span className="text-white">
							Je suis ouvert à toutes les idées et projets.
							N'hésitez pas à me contacter pour discuter de votre
							projet et voir comment je peux vous aider à le
							réaliser.
						</span>
					</Placeholder>

					<SubTitle>Pièces jointes</SubTitle>
					<Placeholder className="flex items-center justify-between gap-3">
						<Pin>Télécharger</Pin>
					</Placeholder>

					<SubTitle>Labels</SubTitle>
					<span>
						<Pin>alternance</Pin>
						<Pin>Collaboration</Pin>
					</span>
				</CardWindow>
			</div>
		</>
	);
}
