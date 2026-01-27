import React from 'react';
import { Download, AlertTriangle, ChevronRight } from 'lucide-react';

interface ResultData {
    score: string;
    roast: string;
    redFlag: string;
    nickname?: string;
    cardImage?: string;
    advice: string[];
}

interface ResultDisplayProps {
    data: ResultData;
    onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, onReset }) => {
    return (
        <section className="result-section">
            <div className="container">
                <div className="card result-card">
                    <h2 className="glitch accent-green" data-text="Il Tuo Verdetto:">Il Tuo Verdetto:</h2>

                    <div className="score-container">
                        <div className="score-circle">
                            <span className="score-value accent-green">{data.score}</span>
                            <span className="score-label">BRANDING SCORE</span>
                        </div>
                    </div>

                    {data.nickname && (
                        <div className="nickname-box">
                            <span className="mono accent-cyan">SOPRANNOME: </span>
                            <span className="nickname text-bold">{data.nickname}</span>
                        </div>
                    )}

                    <div className="roast-text">
                        <blockquote>"{data.roast}"</blockquote>
                    </div>

                    <div className="red-flag-box">
                        <AlertTriangle className="accent-red" size={20} />
                        <div>
                            <span className="accent-red text-bold">RED FLAG: </span>
                            <span>{data.redFlag}</span>
                        </div>
                    </div>

                    <div className="actions">
                        <a
                            href={data.cardImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            <Download size={18} />
                            Scarica la Tua Card della Vergogna
                        </a>
                        <button className="btn-outline">
                            Ottieni il Report Dettagliato (15€)
                        </button>
                    </div>
                </div>

                <div className="advice-section">
                    <h3 className="accent-cyan">Consigli "No-Bullshit"</h3>
                    <ul className="advice-list">
                        {data.advice.map((item, index) => (
                            <li key={index} className="advice-item">
                                <ChevronRight className="accent-green" size={20} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={onReset} className="btn-text accent-muted mt-2">
                        ← Analizza un altro profilo
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ResultDisplay;
