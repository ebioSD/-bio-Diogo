import { Message } from '../types';
import { motion } from 'motion/react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isModel = message.role === 'model';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex w-full mb-4 ${isModel ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[85%] md:max-w-[80%] ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isModel ? 'bg-health-primary text-white mr-2' : 'bg-slate-200 text-slate-600 ml-2'}`}>
          {isModel ? <Bot size={18} /> : <User size={18} />}
        </div>
        
        <div className={`rounded-2xl px-4 py-2 shadow-sm ${
          isModel 
            ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200' 
            : 'bg-health-primary text-white rounded-tr-none'
        }`}>
          <div className="markdown-body text-sm leading-relaxed prose prose-slate max-w-none">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
          
          <div className={`mt-1 text-[10px] opacity-40 ${isModel ? 'text-slate-500' : 'text-white'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
