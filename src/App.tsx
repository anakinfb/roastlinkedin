import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingOverlay from './components/LoadingOverlay';
import ResultDisplay from './components/ResultDisplay';
import './index.css';

// Webhook URL (placeholder as requested)
const WEBHOOK_URL = 'https://parentesikuadra.app.n8n.cloud/webhook-test/roast';

interface ResultData {
  score: string;
  roast: string;
  redFlag: string;
  nickname?: string;
  cardImage?: string;
  advice: string[];
}

function App() {
  const [view, setView] = useState<'hero' | 'loading' | 'result'>('hero');
  const [result, setResult] = useState<ResultData | null>(null);

  const handleAnalyze = async (url: string) => {
    setView('loading');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedinUrl: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audit data');
      }

      const data = await response.json();

      // Delaying transition slightly to allow the animation to feel "complete"
      setTimeout(() => {
        setResult({
          score: data.score || "4/10",
          roast: data.roast || "Questo profilo è così generico che ho dimenticato di chi fosse mentre lo leggevo.",
          redFlag: data.redFlag || "Uso eccessivo di 'pasionario' e 'visionario' senza una singola competenza reale.",
          nickname: data.nickname || "L'Evangelista del Nulla",
          cardImage: data.cardImage || "#",
          advice: data.advice || [
            "Togli quella foto in bianco e nero fatta col cellulare.",
            "Smettila di postare citazioni motivazionali di Steve Jobs.",
            "Descrivi effettivamente COSA fai, non come lo senti."
          ]
        });
        setView('result');
      }, 4500); // 4.5 seconds to sync with terminal animation logic

    } catch (error) {
      console.error('Error during analysis:', error);
      // Fallback for demo if webhook is not reachable
      setTimeout(() => {
        setResult({
          score: "3/10",
          roast: "Questo profilo urla 'Ho venduto corsi di crypto nel 2021'. È un mix letale di buzzword obsolete e disperazione professionale.",
          redFlag: "La tua headline è più lunga dei tuoi successi lavorativi.",
          nickname: "Il Re del Cringe Aziendale",
          advice: [
            "Cancella la parola 'Synergy' dal tuo vocabolario.",
            "La tua bio non è un romanzo di formazione. Sii breve.",
            "Aggiorna la tua esperienza lavorativa, siamo nel 2026."
          ]
        });
        setView('result');
      }, 4500);
    }
  };

  const handleReset = () => {
    setView('hero');
    setResult(null);
  };

  return (
    <div className="app">
      <Header />

      <main>
        {view === 'hero' && (
          <Hero onAnalyze={handleAnalyze} isLoading={false} />
        )}

        {view === 'loading' && (
          <LoadingOverlay />
        )}

        {view === 'result' && result && (
          <ResultDisplay data={result} onReset={handleReset} />
        )}
      </main>

      {/* Background decoration elements */}
      <div className="bg-glitch-lines"></div>
    </div>
  );
}

export default App;
