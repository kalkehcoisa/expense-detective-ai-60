import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { simulateSaving } from '@/lib/aiEngine';

export function FinancialSimulation() {
  const [value, setValue] = useState('');
  const result = value && parseFloat(value) > 0 ? simulateSaving(parseFloat(value)) : '';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-lg">Simulação Financeira</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-3">Quanto você conseguiria economizar por mês?</p>

      <Input
        type="number"
        placeholder="Ex: 200"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mb-3"
      />

      {result && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-l-4 border-l-accent bg-accent/5 rounded-lg p-4"
        >
          <p className="text-sm leading-relaxed">{result}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
