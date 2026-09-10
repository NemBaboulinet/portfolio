import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import type { SectionNavItem } from './SectionNav';

type MenuBurgerProps = {
	items: SectionNavItem[];
	activeIndex: number;
	goToSection: (index: number) => void;
	accentColor?: string;
};

export function MenuBurger({
	items,
	activeIndex,
	goToSection,
	accentColor = '#9BE800',
}: MenuBurgerProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="md:hidden fixed top-4 right-4 z-50">
				<Button
					aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
					shape="circle"
					size="large"
					icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
					onClick={() => setIsOpen((v) => !v)}
				/>
			</div>

			<Drawer
				placement="right"
				open={isOpen}
				onClose={() => setIsOpen(false)}
				closable={false}
			>
				<nav aria-label="Navigation par sections (mobile)">
					{items.map((item, index) => (
						<div
							key={item.id}
							onClick={() => {
								goToSection(index);
								setIsOpen(false);
							}}
							style={{
								padding: '12px 0',
								fontWeight: index === activeIndex ? 700 : 400,
								color:
									index === activeIndex
										? accentColor
										: undefined,
								cursor: 'pointer',
							}}
						>
							{item.label}
						</div>
					))}
				</nav>
			</Drawer>
		</>
	);
}
