import React from 'react'
import Footer from './Footer';
import NavBar from './NavBar';

interface LayoutProps {
    footer?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, footer }) => {
    return (
        <>
            <NavBar />
            {children}
            {footer && <Footer />}
        </>
    );
}

export default Layout