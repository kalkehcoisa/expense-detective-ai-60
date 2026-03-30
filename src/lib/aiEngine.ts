import { Expense, AIInsight, SmartAlert } from './types';

export function generateInsights(expenses: Expense[]): AIInsight[] {
  const insights: AIInsight[] = [];
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  if (total === 0) return [{ type: 'tip', message: 'Adicione seus gastos para receber análises personalizadas.' }];

  const byCategory: Record<string, number> = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });

  // Alimentação fora
  const alim = (byCategory['Alimentação'] || 0) + (byCategory['Delivery'] || 0);
  const alimPct = (alim / total) * 100;
  if (alimPct > 25) {
    insights.push({ type: 'warning', message: `Você gasta ${alimPct.toFixed(0)}% com alimentação fora/delivery, acima do recomendado de 25%. Considere cozinhar mais em casa.` });
  }

  // Delivery
  const delivery = byCategory['Delivery'] || 0;
  if (delivery > 0) {
    insights.push({ type: 'pattern', message: `Seus gastos com delivery totalizam R$${delivery.toFixed(2)} este mês. Se reduzir pela metade, economiza R$${(delivery * 6).toFixed(0)} por ano.` });
  }

  // Lazer
  const lazer = byCategory['Lazer'] || 0;
  const lazerPct = (lazer / total) * 100;
  if (lazerPct > 20) {
    insights.push({ type: 'warning', message: `Lazer representa ${lazerPct.toFixed(0)}% dos seus gastos. Tente encontrar opções gratuitas de entretenimento.` });
  }

  // Weekend spending
  const weekendTotal = expenses
    .filter(e => { const d = new Date(e.date).getDay(); return d === 0 || d === 6; })
    .reduce((s, e) => s + e.amount, 0);
  if (weekendTotal > total * 0.4) {
    insights.push({ type: 'pattern', message: `Seus gastos aumentam nos finais de semana (${((weekendTotal / total) * 100).toFixed(0)}% do total). Planeje atividades econômicas para sábados e domingos.` });
  }

  // Assinaturas
  const subs = byCategory['Assinaturas'] || 0;
  if (subs > 100) {
    insights.push({ type: 'tip', message: `Você gasta R$${subs.toFixed(2)} em assinaturas. Revise quais serviços realmente usa.` });
  }

  // Top category
  const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  if (top) {
    insights.push({ type: 'pattern', message: `Sua maior categoria de gasto é "${top[0]}" com R$${top[1].toFixed(2)} (${((top[1] / total) * 100).toFixed(0)}% do total).` });
  }

  return insights.length ? insights : [{ type: 'tip', message: 'Seus gastos parecem equilibrados! Continue assim. 🎉' }];
}

export function generateAlerts(expenses: Expense[], budget = 3000): SmartAlert[] {
  const alerts: SmartAlert[] = [];
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const pct = (total / budget) * 100;

  if (pct >= 90) alerts.push({ type: 'danger', message: `⚠️ Você já gastou ${pct.toFixed(0)}% do seu orçamento mensal!` });
  else if (pct >= 70) alerts.push({ type: 'warning', message: `Atenção: ${pct.toFixed(0)}% do orçamento mensal já foi usado.` });

  const now = new Date();
  const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
  const remaining = budget - total;
  const dailyBudget = remaining / Math.max(daysLeft, 1);

  if (remaining > 0 && daysLeft > 0) {
    alerts.push({ type: 'info', message: `Você pode gastar R$${dailyBudget.toFixed(2)}/dia nos próximos ${daysLeft} dias.` });
  }
  if (remaining <= 0) {
    alerts.push({ type: 'danger', message: `Seu orçamento acabou! Você está R$${Math.abs(remaining).toFixed(2)} acima do limite.` });
  }

  return alerts;
}

export function calculateScore(expenses: Expense[], budget = 3000): number {
  if (expenses.length === 0) return 50;
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCategory: Record<string, number> = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });
  const cats = Object.keys(byCategory).length;

  // Budget adherence (40 pts)
  const budgetScore = Math.max(0, 40 - Math.max(0, ((total / budget) - 1) * 100));

  // Diversification (30 pts)
  const divScore = Math.min(30, cats * 5);

  // Consistency — low std dev of daily spend (30 pts)
  const dailyMap: Record<string, number> = {};
  expenses.forEach(e => { dailyMap[e.date] = (dailyMap[e.date] || 0) + e.amount; });
  const dailyVals = Object.values(dailyMap);
  const mean = dailyVals.reduce((s, v) => s + v, 0) / dailyVals.length;
  const std = Math.sqrt(dailyVals.reduce((s, v) => s + (v - mean) ** 2, 0) / dailyVals.length);
  const cv = mean > 0 ? std / mean : 0;
  const consistScore = Math.max(0, 30 - cv * 20);

  return Math.round(Math.min(100, budgetScore + divScore + consistScore));
}

export function simulateSaving(monthlyReduction: number): string {
  const yearly = monthlyReduction * 12;
  const fiveYear = yearly * 5 * 1.06; // simple interest
  return `Economizando R$${monthlyReduction.toFixed(0)}/mês, você guarda R$${yearly.toFixed(0)}/ano ou R$${fiveYear.toFixed(0)} em 5 anos (com rendimento).`;
}
