import { Expense } from './types';

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

function d(day: number) {
  return new Date(year, month, day).toISOString().slice(0, 10);
}

export const MOCK_EXPENSES: Expense[] = [
  { id: '1', date: d(1), amount: 45.90, category: 'Alimentação', description: 'Almoço restaurante' },
  { id: '2', date: d(2), amount: 150, category: 'Transporte', description: 'Uber semana' },
  { id: '3', date: d(3), amount: 1200, category: 'Moradia', description: 'Aluguel' },
  { id: '4', date: d(4), amount: 89.90, category: 'Lazer', description: 'Cinema + jantar' },
  { id: '5', date: d(5), amount: 200, category: 'Saúde', description: 'Consulta médica' },
  { id: '6', date: d(6), amount: 67.50, category: 'Delivery', description: 'iFood' },
  { id: '7', date: d(7), amount: 34.90, category: 'Assinaturas', description: 'Netflix' },
  { id: '8', date: d(8), amount: 55, category: 'Delivery', description: 'Rappi' },
  { id: '9', date: d(9), amount: 120, category: 'Compras', description: 'Roupas' },
  { id: '10', date: d(10), amount: 78, category: 'Alimentação', description: 'Supermercado' },
  { id: '11', date: d(11), amount: 42, category: 'Delivery', description: 'iFood sábado' },
  { id: '12', date: d(12), amount: 95, category: 'Lazer', description: 'Bar com amigos' },
  { id: '13', date: d(13), amount: 180, category: 'Educação', description: 'Curso online' },
  { id: '14', date: d(14), amount: 35, category: 'Transporte', description: 'Gasolina' },
  { id: '15', date: d(15), amount: 62, category: 'Alimentação', description: 'Restaurante' },
  { id: '16', date: d(16), amount: 49.90, category: 'Assinaturas', description: 'Spotify + gym' },
  { id: '17', date: d(17), amount: 110, category: 'Compras', description: 'Eletrônicos' },
  { id: '18', date: d(18), amount: 88, category: 'Delivery', description: 'Pizza sexta' },
  { id: '19', date: d(19), amount: 250, category: 'Lazer', description: 'Show' },
  { id: '20', date: d(20), amount: 43, category: 'Alimentação', description: 'Café e lanche' },
];
