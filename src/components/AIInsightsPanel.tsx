import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Expense } from '@/lib/types';
import { analyzeExpenses } from '@/services/aiService';
import ReactMarkdown from 'react-markdown';

interface Props {
  expenses: Expense[];
}

export function AIInsightsPanel({ expenses }: Props) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeExpenses(expenses);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'Erro ao analisar seus dados. Tente novamente.');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> AI Insights
        </h3>
        <Button onClick={analyze} disabled={loading} size="sm" className="gradient-primary text-primary-foreground font-medium">
          {loading ? 'Analisando...' : 'Analisar meus gastos'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 py-8 justify-center text-muted-foreground">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <div className="absolute inset-0 rounded-full animate-pulse-ring border-2 border-primary/30" />
            </div>
            <span className="text-sm">A IA está analisando seus gastos...</span>
          </motion.div>
        )}

        {!loading && error && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive bg-destructive/10 rounded-lg p-4 text-center">
            {error}
          </motion.div>
        )}

        {!loading && analysis && !error && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </motion.div>
        )}

        {!loading && !analysis && !error && (
          <p className="text-sm text-muted-foreground py-4 text-center">Clique em "Analisar" para a IA investigar seus gastos.</p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
