import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface Props {
  score: number;
}

function getColor(score: number) {
  if (score >= 75) return 'text-accent';
  if (score >= 50) return 'text-primary';
  return 'text-destructive';
}

function getLabel(score: number) {
  if (score >= 80) return 'Excelente';
  if (score >= 60) return 'Bom';
  if (score >= 40) return 'Regular';
  return 'Precisa melhorar';
}

export function FinancialScore({ score }: Props) {
  const circumference = 283;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-lg">Score Financeiro</h3>
      </div>

      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="45" fill="none"
            strokeWidth="8" strokeLinecap="round"
            stroke="currentColor"
            className={getColor(score)}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-display font-bold ${getColor(score)}`}>{score}</span>
        </div>
      </div>

      <span className={`text-sm font-semibold mt-2 ${getColor(score)}`}>{getLabel(score)}</span>
      <p className="text-xs text-muted-foreground mt-1 text-center">Baseado em consistência, distribuição e orçamento</p>
    </motion.div>
  );
}
