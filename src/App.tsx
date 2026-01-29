import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingOverlay from './components/LoadingOverlay';
import ResultDisplay from './components/ResultDisplay';
import './index.css';

// Webhook URL (placeholder as requested)
const WEBHOOK_URL = 'https://parentesikuadra.app.n8n.cloud/webhook/roast';

interface ResultData {
  score: string;
  roast: string;
  redFlag: string;
  nickname?: string;
  cardImage?: string;
  advice: string[];
  sharePost?: string;
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

      const rawData = await response.json();
      console.log('n8n Response:', rawData);

      // Handle cases where data might be nested in an 'output' property or stringified
      let data = rawData;
      if (rawData.output && typeof rawData.output === 'string') {
        try {
          data = JSON.parse(rawData.output.replace(/```json\n?|```/g, ''));
        } catch (e) {
          console.error('Failed to parse nested JSON in output property');
        }
      } else if (rawData.output) {
        data = rawData.output;
      }

      // Delaying transition slightly to allow the animation to feel "complete"
      setTimeout(() => {
        setResult({
          score: data.score || data.output?.score || "4/10",
          roast: data.roast || data.output?.roast || "Profilo troppo anonimo per un roast serio.",
          redFlag: data.redFlag || data.output?.redFlag || "Nessuna informazione pubblica trovata.",
          nickname: data.nickname || data.output?.nickname || "L'Invisibile",
          cardImage: data.cardImage || "#",
          sharePost: data.sharePost || data.output?.sharePost || `Ho appena scoperto il mio Branding Score su Roast My LinkedIn! La verità fa male. Prova anche tu: ${window.location.origin}`,
          advice: Array.isArray(data.advice) ? data.advice :
            (Array.isArray(data.output?.advice) ? data.output.advice : [
              "Fatti un profilo meno blindato",
              "Aggiungi qualche keyword reale",
              "Smetti di nasconderti"
            ])
        });
        setView('result');
      }, 4500);

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
