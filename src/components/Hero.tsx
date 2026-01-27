import React, { useState } from 'react';

interface HeroProps {
    onAnalyze: (url: string) => void;
    isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onAnalyze, isLoading }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onAnalyze(url);
        }
    };

    return (
        <section className="hero">
            <div className="container hero-content">
                <h1 className="glitch" data-text="La Cruda Verità sul Tuo LinkedIn.">
                    La Cruda Verità sul Tuo LinkedIn.
                </h1>
                <p className="subtitle">
                    Smetti di sembrare un CV del 2005. Scopri cosa pensano davvero i recruiter.
                </p>

                <form className="input-form" onSubmit={handleSubmit}>
                    <label htmlFor="linkedin-url">Incolla qui l'URL del tuo profilo LinkedIn:</label>
                    <div className="input-group">
                        <input
                            id="linkedin-url"
                            type="text"
                            placeholder="https://www.linkedin.com/in/tuo-nome-cognome..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={isLoading}
                            className="url-input"
                            required
                        />
                        <button type="submit" className="btn-primary" disabled={isLoading || !url}>
                            {isLoading ? 'Analisi in corso...' : 'Analizza la Vittima'}
                        </button>
                    </div>
                </form>

                <p className="disclaimer">
                    Analizziamo solo dati pubblici. Nessuna credenziale richiesta. Privacy garantita.
                </p>
            </div>
        </section>
    );
};

export default Hero;
