import React, { useState, useEffect } from 'react';

const LOG_LINES = [
    '[SCANNING] Initializing AI protocols...',
    '[ACCESS] Retrieving public profile data...',
    '[ANALYZING] Evaluating keywords, skills, and cringe-factors...',
    '[ROASTING] Generating brutally honest feedback...',
    '[COMPLETE] Audit finished. Preparing your dose of reality...'
];

const LoadingOverlay: React.FC = () => {
    const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < LOG_LINES.length) {
                setVisibleLogs(prev => [...prev, LOG_LINES[currentLine]]);
                currentLine++;
                setProgress((currentLine / LOG_LINES.length) * 100);
            } else {
                clearInterval(interval);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-overlay">
            <div className="terminal">
                <div className="terminal-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="terminal-title">system_audit.sh</span>
                </div>
                <div className="terminal-body mono">
                    {visibleLogs.map((log, index) => (
                        <div key={index} className="log-line">
                            <span className="accent-green">$ </span>{log}
                        </div>
                    ))}
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
