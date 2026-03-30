import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { SmartAlert } from '@/lib/types';

const alertStyles = {
  danger: { icon: AlertCircle, cls: 'border-l-destructive bg-destructive/5 text-destructive' },
  warning: { icon: AlertTriangle, cls: 'border-l-warning bg-warning/5 text-warning' },
  info: { icon: Info, cls: 'border-l-info bg-info/5 text-info' },
};

interface Props {
  alerts: SmartAlert[];
}

export function SmartAlertsPanel({ alerts }: Props) {
  if (!alerts.length) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
      {alerts.map((alert, i) => {
        const { icon: Icon, cls } = alertStyles[alert.type];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border-l-4 rounded-lg p-3 flex items-center gap-3 ${cls}`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <p className="text-sm font-medium">{alert.message}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
