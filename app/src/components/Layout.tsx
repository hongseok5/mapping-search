import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SideNavigation from './SideNavigation';
import styles from '../styles/Main.module.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.mainPage}>
            <Header />
            <div className={styles.content}>
                <SideNavigation />
                <main className={styles.mainContent}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}


export default Layout;
