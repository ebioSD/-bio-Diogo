import { Activity, ShieldAlert, Heart, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface QuickActionsProps {
  onAction: (query: string) => void;
}

export default function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    { 
      id: 'malaria', 
      title: 'Malária', 
      icon: <ShieldAlert size={20} />, 
      query: 'Como posso me prevenir da malária?', 
      color: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' 
    },
    { 
      id: 'cholera', 
      title: 'Cólera', 
      icon: <Activity size={20} />, 
      query: 'Quais são os sinais da cólera e como prevenir?', 
      color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' 
    },
    { 
      id: 'reproduction', 
      title: 'Saúde Reprodutiva', 
      icon: <Heart size={20} />, 
      query: 'Fale sobre métodos de planeamento familiar.', 
      color: 'bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100' 
    },
    { 
      id: 'prevention', 
      title: 'Prevenção Geral', 
      icon: <Info size={20} />, 
      query: 'Dicas básicas de saúde e higiene em casa.', 
      color: 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' 
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 p-4 bg-transparent">
      {actions.map((action, idx) => (
        <motion.button
          key={action.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => onAction(action.query)}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-left group ${action.color}`}
        >
          <div className="mb-2 transition-transform group-hover:scale-110">
            {action.icon}
          </div>
          <span className="text-xs font-semibold">{action.title}</span>
        </motion.button>
      ))}
    </div>
  );
}
