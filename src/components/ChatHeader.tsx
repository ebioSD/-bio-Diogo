import { Stethoscope, ShieldCheck, HeartPulse } from 'lucide-react';

export default function ChatHeader() {
  return (
    <header className="px-6 py-4 bg-white border-bottom border-slate-200 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-health-primary p-2 rounded-xl text-white">
          <HeartPulse size={24} />
        </div>
        <div>
          <h1 className="font-serif italic text-xl text-slate-800 leading-tight">Guia de Saúde</h1>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-health-secondary">Comunitária • Moçambique</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
        <ShieldCheck size={14} className="text-health-primary" />
        <span className="text-[10px] font-bold text-health-secondary uppercase tracking-tight">IA Segura</span>
      </div>
    </header>
  );
}
