import { Row, Col } from 'antd';
import { H2, TextContent, Citation } from './TextStyle';
import { Pin } from './CardWindow';

export default function AboutMe() {
	return (
		<Row
			gutter={[{ xs: 16, md: 48 }, 16]}
			align="middle"
			className="w-full max-w-6xl px-4 md:px-6"
		>
			<Col xs={24} md={8}>
				<img
					src="/kbPortfolio.png"
					alt="Kevin BYTEBIER"
					className="aspect-square w-full sm:max-w-xs max-w-20 [@media(max-height:600px)]:hidden sm:[@media(max-height:600px)]:block mx-auto rounded-full object-cover"
				/>
			</Col>
			<Col xs={24} md={16} className="space-y-2 sm:space-y-4">
				<H2>Kevin BYTEBIER</H2>
				<Citation>«Du brûleur au clavier»</Citation>
				<TextContent>
					Après plus de 15 ans d&apos;expérience professionnelle dans
					le domaine technique, le management et l&apos;aérostation
					(pilote de montgolfière et ballon captif), j&apos;ai fait le
					choix de donner un nouveau cap à ma carrière en me
					reconvertissant dans ce qui me passionne depuis toujours :
					le développement web et software.
				</TextContent>
				<TextContent>
					Aujourd&apos;hui développeur freelance (micro-entreprise),
					je combine la maturité du monde de l&apos;entreprise avec un
					écosystème technique moderne. Titulaire d&apos;un titre RNCP
					niveau 5 obtenu au CESI de Reims, je suis basé dans la Marne
					et disponible pour des missions en full remote.
				</TextContent>
				<div className="flex flex-wrap gap-2 pt-1">
					{['Applications web', 'Automatisation', 'DevOps'].map(
						(service) => (
							<Pin key={service} className="text-xs sm:text-sm">
								{service}
							</Pin>
						),
					)}
				</div>
			</Col>
		</Row>
	);
}
