import { Row, Col } from 'antd';
import { SERVICES } from '../data/services';
import { CardWindow } from './CardWindow';
import { Citation, H3, TextContent } from './TextStyle';

export default function Services() {
	return (
		<div className="flex flex-col items-center w-full max-w-6xl px-4 sm:px-6">
			<H3 className="text-center">Ce que je peux faire pour vous</H3>
			<Citation className="text-center">
				Cinq domaines, un seul interlocuteur
			</Citation>

			<Row
				gutter={[
					{ xs: 12, sm: 24 },
					{ xs: 12, sm: 24 },
				]}
				justify="center"
				className="mt-3 sm:mt-8 w-full"
			>
				{SERVICES.map((service) => (
					<Col key={service.id} xs={24} md={12} lg={8}>
						<CardWindow
							title={
								<>
									<span className="w-2.75 h-2.75 rounded-full bg-[#ff5f56]" />
									<span className="w-2.75 h-2.75 rounded-full bg-[#ffbd2e]" />
									<span className="w-2.75 h-2.75 rounded-full bg-[#27c93f]" />
									<span className="absolute left-1/2 -translate-x-1/2 max-w-[55%] truncate font-mono text-xs text-white/40">
										{service.file}
									</span>
								</>
							}
						>
							<h4 className="text-xl sm:text-2xl font-bold text-white leading-tight">
								{service.name}
							</h4>
							<TextContent className="mt-1 sm:mt-2 text-xs! sm:text-sm!">
								{service.desc}
							</TextContent>
							<ul className="mt-2 sm:mt-4 space-y-1 font-mono text-xs sm:text-[13px] leading-relaxed text-white/75">
								{service.items.map((item) => (
									<li key={item}>
										<span className="text-lime-accent">
											❯
										</span>{' '}
										{item}
									</li>
								))}
							</ul>
							<p className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-white/10 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
								{service.stack}
							</p>
						</CardWindow>
					</Col>
				))}
			</Row>

			<a
				href="#contactMe"
				className="mt-4 sm:mt-8 text-lime-accent underline underline-offset-4 hover:text-white transition-colors"
			>
				Discuter de votre projet →
			</a>
		</div>
	);
}
