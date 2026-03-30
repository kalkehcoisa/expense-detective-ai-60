export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}

export interface AIInsight {
  type: 'warning' | 'tip' | 'pattern';
  message: string;
}

export interface SmartAlert {
  type: 'danger' | 'warning' | 'info';
  message: string;
}

export const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Compras',
  'Delivery',
  'Assinaturas',
  'Outros',
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  'Alimentação': 'hsl(38, 92%, 50%)',
  'Transporte': 'hsl(210, 80%, 55%)',
  'Moradia': 'hsl(160, 60%, 45%)',
  'Lazer': 'hsl(280, 60%, 55%)',
  'Saúde': 'hsl(0, 72%, 55%)',
  'Educação': 'hsl(190, 70%, 45%)',
  'Compras': 'hsl(330, 60%, 55%)',
  'Delivery': 'hsl(20, 80%, 50%)',
  'Assinaturas': 'hsl(250, 50%, 55%)',
  'Outros': 'hsl(220, 10%, 50%)',
};
