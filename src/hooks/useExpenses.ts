import { useState, useCallback, useMemo } from 'react';
import { Expense } from '@/lib/types';
import { MOCK_EXPENSES } from '@/lib/mockData';

const STORAGE_KEY = 'expense-detective-data';

function loadExpenses(): Expense[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : MOCK_EXPENSES;
  } catch {
    return MOCK_EXPENSES;
  }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses);

  const save = (updated: Expense[]) => {
    setExpenses(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: crypto.randomUUID() };
    save([newExpense, ...expenses]);
  }, [expenses]);

  const deleteExpense = useCallback((id: string) => {
    save(expenses.filter(e => e.id !== id));
  }, [expenses]);

  const totalMonth = useMemo(() => {
    const now = new Date();
    return expenses
      .filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  return { expenses, addExpense, deleteExpense, totalMonth, byCategory };
}
