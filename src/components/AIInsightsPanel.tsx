import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Expense, AIInsight } from '@/lib/types';
import { generateInsights } from '@/lib/aiEngine';

const icons = {
  warning: AlertTriangle,
  tip: Lightbulb,
  pattern: TrendingUp,
};

const styles = {
  warning: 'border-l-warning bg-warning/5',
  tip: 'border-l-accent bg-accent/5',
  pattern: 'border-l-info bg-info/5',
};

interface Props {
  expenses: Expense[];
}

export function AIInsightsPanel({ expenses }: Props) {
  const [insights, setInsights] = useState<AIInsight[] | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      setInsights(generateInsights(expenses));
      setLoading(false);
    }, 1200);
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
            <span className="text-sm">Investigando seus padrões...</span>
          </motion.div>
        )}

        {!loading && insights && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {insights.map((insight, i) => {
              const Icon = icons[insight.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`border-l-4 rounded-lg p-4 ${styles[insight.type]}`}
                >
                  <div className="flex gap-3">
                    <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{insight.message}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {!loading && !insights && (
          <p className="text-sm text-muted-foreground py-4 text-center">Clique em "Analisar" para a IA investigar seus gastos.</p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
