import React from 'react';
import '../styles/SideNavigation.css';
import Link from 'next/link';

const SideNavigation: React.FC = () => {
    return (
        <aside className="side-navigation">
            <ul>
                <li><Link href="/flight">Flight</Link></li>
                <li><Link href="/section2">Section 2</Link></li>
                <li><Link href="/section3">Section 3</Link></li>
            </ul>
        </aside>
    );
}

export default SideNavigation;
