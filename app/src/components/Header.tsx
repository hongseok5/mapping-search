import React from 'react';
import Link from 'next/link';
import '../styles/Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>My Website</h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
