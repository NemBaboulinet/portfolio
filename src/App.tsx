import WarningModal from './components/Modal';
import Section from './components/Section';
import { SectionNav } from './components/SectionNav';

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
						id: 'intro',
						label: 'Introduction',
					},
				]}
			></SectionNav>
			<Section id="hero">
				<WarningModal />

				<text className="text-8xl text-white font-bold">
					Kevin BYTEBIER
				</text>
			</Section>
			<Section id="intro">
				<text className="text-8xl text-white font-bold">
					Portfolio in progress
				</text>
			</Section>
		</>
	);
}
