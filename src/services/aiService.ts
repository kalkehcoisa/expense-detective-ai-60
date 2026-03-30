import { supabase } from '@/integrations/supabase/client';
import { Expense } from '@/lib/types';

export async function analyzeExpenses(expenses: Expense[]): Promise<string> {
  const { data, error } = await supabase.functions.invoke('analyze-expenses', {
    body: { expenses },
  });

  if (error) {
    console.error('AI analysis error:', error);
    throw new Error('Erro ao analisar seus dados. Tente novamente.');
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data.analysis;
}
