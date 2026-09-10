import WarningModal from './components/Modal';
import Section from './components/Section';
import { SectionNav } from './components/SectionNav';
import GitHistoric from './components/GitHistoric';

export default function App() {
	const title =
		'text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text_9xl font-bold text-white';
	return (
		<>
			<SectionNav
				items={[
					{
						id: 'hero',
						label: 'Bienvenue',
					},
					{
						id: 'aboutMe',
						label: 'À propos de moi',
					},
					{
						id: 'gitHistoric',
						label: 'Historique Git',
					},
				]}
			></SectionNav>
			<Section id="hero">
				<WarningModal />

				<text className={title}>Kevin BYTEBIER</text>
			</Section>
			<Section id="aboutMe">
				<text className={title}>A propos de moi</text>
			</Section>
			<Section id="gitHistoric">
				<GitHistoric />
			</Section>
		</>
	);
}
