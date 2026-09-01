import WarningModal from './components/Modal';
import Section from './components/Section';

export default function App() {
	return (
		<>
			<Section>
				<WarningModal />

				<text className="text-8xl text-white font-bold">
					Kevin BYTEBIER
				</text>
			</Section>
			<Section>
				<text className="text-8xl text-white font-bold">
					Portfolio in progress
				</text>
			</Section>
		</>
	);
}
