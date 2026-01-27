import React from 'react';
import { Mail, Shield } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container header-content">
                <div className="logo glitch" data-text="RoastMyProfile.AI">
                    <Shield className="logo-icon accent-cyan" />
                    <span>RoastMyProfile<span className="accent-cyan">.AI</span></span>
                </div>
                <nav className="nav">
                    <a href="#" className="nav-link">Login</a>
                    <a href="mailto:contact@roastmyprofile.ai" className="nav-link nav-icon-link">
                        <Mail size={20} />
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
