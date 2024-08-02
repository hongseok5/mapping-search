import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SideNavigation from './Side-Navi';
import '../styles/MainPage.css';

const MainPage: React.FC = () => {
    return (
        <div className="main-page">
            <Header />
            <div className="content">
                <SideNavigation />
                <main className="main-content">
                    <h2>Welcome to My Website</h2>
                    <p>This is the main content area.</p>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
