import { Row, Col } from 'antd';
import { H2, TextContent, Citation } from './TextStyle';

export default function AboutMe() {
	return (
		<Row gutter={[48, 32]} align="middle">
			<Col xs={24} md={8}>
				<img
					src="/kbPortfolio.png"
					alt="Kevin BYTEBIER"
					className="aspect-square w-full max-w-xs mx-auto rounded-full object-cover"
				/>
			</Col>
			<Col xs={24} md={16} className="space-y-4">
				<H2>Kevin BYTEBIER</H2>
				<Citation>«Du brûleur au clavier»</Citation>
				<TextContent>
					Après plus de 15 ans d&apos;expérience professionnelle dans
					le domaine technique, le management et l&apos;aérostation,
					j&apos;ai fait le choix de donner un nouveau cap à ma
					carrière en me reconvertissant dans ce qui me passionne
					depuis toujours : le développement web et software.
				</TextContent>
				<TextContent>
					{' '}
					En tant que développeur «Full-Stack» Junior, je combine la
					maturité du monde de l&apos;entreprise avec un écosystème
					technique moderne. Je suis actuellement basé à Épernay et je
					prépare un diplôme de Concepteur Développeur
					d&apos;Applications (CDA) au CESI de Reims, tout en
					recherchant une alternance dans la région (Reims, Épernay,
					Chalons-en- Champagne) ou à distance.
				</TextContent>
			</Col>
		</Row>
	);
}
