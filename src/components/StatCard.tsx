import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: 'primary' | 'accent' | 'destructive' | 'info';
}

const accentMap = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  destructive: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
};

export function StatCard({ label, value, icon: Icon, accent = 'primary' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accentMap[accent]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-display font-bold">{value}</p>
    </motion.div>
  );
}
