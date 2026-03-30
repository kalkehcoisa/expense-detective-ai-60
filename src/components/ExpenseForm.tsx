import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES, Expense } from '@/lib/types';

interface Props {
  onAdd: (expense: Omit<Expense, 'id'>) => void;
}

export function ExpenseForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;
    onAdd({ date, amount: parseFloat(amount), category, description });
    setAmount('');
    setDescription('');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gradient-primary text-primary-foreground font-semibold gap-2 shadow-lg hover:shadow-xl transition-shadow">
        <Plus className="w-4 h-4" /> Adicionar Gasto
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.form
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 w-full max-w-md shadow-2xl border border-border space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-lg">Novo Gasto</h2>
                <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input type="number" placeholder="Valor (R$)" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Categoria" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="Descrição (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} />

              <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold">Salvar</Button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
