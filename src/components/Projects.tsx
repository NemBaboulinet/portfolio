import { H3, TextContent } from './TextStyle';

export default function Projects() {
	return (
		<>
			<H3> Page en cours de construction </H3>
			<TextContent className="mt-8">
				Veuillez m&apos;excuser pour la gêne occasionnée, je vous invite
				à vous diriger vers mon profil{' '}
				<a
					href="https://github.com/NemBaboulinet"
					target="_blank"
					rel="noreferrer noopener"
					className="hover:text-white transition-colors underline underline-offset-4 decoration-lime-accent/50 hover:decoration-lime-accent"
				>
					github
				</a>{' '}
				pour y retrouver mes projets aboutis et en cours.
			</TextContent>
		</>
	);
}
