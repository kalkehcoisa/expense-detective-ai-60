import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_COLORS } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props {
  data: { name: string; value: number }[];
}

export function CategoryChart({ data }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
      <h3 className="font-display font-semibold text-lg mb-4">Gastos por Categoria</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={80} strokeWidth={2} stroke="hsl(var(--card))">
                {data.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#888'} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: number) => `R$${val.toFixed(2)}`}
                contentStyle={{ borderRadius: '0.75rem', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-3 text-sm">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[entry.name] }} />
              <span className="flex-1 text-muted-foreground">{entry.name}</span>
              <span className="font-medium">R${entry.value.toFixed(0)}</span>
              <span className="text-muted-foreground w-10 text-right">{((entry.value / total) * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
