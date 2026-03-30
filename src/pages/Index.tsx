import { useMemo } from 'react';
import { DollarSign, TrendingDown, BarChart3, Wallet } from 'lucide-react';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { CategoryChart } from '@/components/CategoryChart';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { AIInsightsPanel } from '@/components/AIInsightsPanel';
import { SmartAlertsPanel } from '@/components/SmartAlerts';
import { FinancialScore } from '@/components/FinancialScore';
import { FinancialSimulation } from '@/components/FinancialSimulation';
import { useExpenses } from '@/hooks/useExpenses';
import { generateAlerts, calculateScore } from '@/lib/aiEngine';

const Index = () => {
  const { expenses, addExpense, deleteExpense, totalMonth, byCategory } = useExpenses();
  const alerts = useMemo(() => generateAlerts(expenses), [expenses]);
  const score = useMemo(() => calculateScore(expenses), [expenses]);
  const avgExpense = expenses.length ? totalMonth / expenses.length : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 space-y-6">
        {/* Alerts */}
        <SmartAlertsPanel alerts={alerts} />

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl">Dashboard</h2>
          <ExpenseForm onAdd={addExpense} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total do Mês" value={`R$${totalMonth.toFixed(0)}`} icon={DollarSign} accent="primary" />
          <StatCard label="Média por Gasto" value={`R$${avgExpense.toFixed(0)}`} icon={TrendingDown} accent="info" />
          <StatCard label="Categorias" value={`${byCategory.length}`} icon={BarChart3} accent="accent" />
          <StatCard label="Transações" value={`${expenses.length}`} icon={Wallet} accent="primary" />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AIInsightsPanel expenses={expenses} />
            <CategoryChart data={byCategory} />
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </div>
          <div className="space-y-6">
            <FinancialScore score={score} />
            <FinancialSimulation />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
