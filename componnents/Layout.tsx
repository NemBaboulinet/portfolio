import React from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div>
			<header>
				<nav className="flex flex-col justify-space-around felx start min-h-auto">
					Menu
				</nav>
			</header>
			<main>{children}</main>
			<body className="bg-bg2 w-full h-screen bg-cover bg-center"></body>
		</div>
	);
};

export default Layout;
