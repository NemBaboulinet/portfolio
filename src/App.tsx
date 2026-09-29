import WarningModal from './components/Modal';
import Section from './components/Section';
import { SectionNav } from './components/SectionNav';
import GitHistoric from './components/GitHistoric';
import AboutMe from './components/AboutMe';
import LandingPage from './components/LandingPage';

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
						id: 'projects',
						label: 'Mes projets',
					},
					{
						id: 'gitHistoric',
						label: 'Historique Git',
					},
					{
						id: 'contactMe',
						label: 'Me contacter',
					},
				]}
			></SectionNav>
			<Section id="hero">
				<WarningModal />
				<LandingPage />
			</Section>
			<Section id="aboutMe">
				<AboutMe />
			</Section>
			<Section id="projects">
				<Projects />
			</Section>
			<Section id="gitHistoric">
				<GitHistoric />
			</Section>
			<Section id="contactMe">
				<ContactMe />
			</Section>
		</>
	);
}
