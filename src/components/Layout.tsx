import React from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="bg-bg2 bg-cover bg-center min-h-screen w-full flex flex-col">
			<header>
				<nav className="flex flex-col justify-space-around felx start min-h-auto text-amber-200">
					test Cedric
				</nav>
			</header>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
