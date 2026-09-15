import WarningModal from './components/Modal';
import Section from './components/Section';
import { SectionNav } from './components/SectionNav';
import GitHistoric from './components/GitHistoric';
import AboutMe from './components/AboutMe';
import { H2 } from './components/TextStyle';

export default function App() {
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
				<H2>Kevin BYTEBIER</H2>
			</Section>
			<Section id="aboutMe">
				<AboutMe />
			</Section>
			<Section id="gitHistoric">
				<GitHistoric />
			</Section>
		</>
	);
}
