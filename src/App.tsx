import WarningModal from './components/Modal';
import Section from './components/Section';
import { SectionNav } from './components/SectionNav';
import GitHistoric from './components/GitHistoric';
import AboutMe from './components/AboutMe';
import LandingPage from './components/LandingPage';
import ContactMe from './components/ContactMe';

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
			<Section id="gitHistoric">
				<GitHistoric />
			</Section>
			<Section id="contactMe">
				<ContactMe />
			</Section>
		</>
	);
}
