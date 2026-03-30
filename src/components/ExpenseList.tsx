import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Expense, CATEGORY_COLORS } from '@/lib/types';

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: Props) {
  const recent = expenses.slice(0, 10);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
      <h3 className="font-display font-semibold text-lg mb-4">Últimos Gastos</h3>
      <div className="space-y-2">
        {recent.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[e.category] }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{e.description || e.category}</p>
              <p className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString('pt-BR')} · {e.category}</p>
            </div>
            <span className="text-sm font-semibold tabular-nums">R${e.amount.toFixed(2)}</span>
            <button onClick={() => onDelete(e.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
        {expenses.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Nenhum gasto registrado.</p>}
      </div>
    </motion.div>
  );
}
