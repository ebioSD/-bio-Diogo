/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { geminiService } from './services/geminiService';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import QuickActions from './components/QuickActions';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou seu Assistente de Saúde Comunitária. Posso dar-lhe informações sobre Malária, Cólera e Saúde Reprodutiva no nosso contexto em Moçambique.\n\nComo posso ajudá-lo hoje?',
      timestamp: Date.now(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Prepare history for Gemini API
    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const responseText = await geminiService.generateResponse(history, text);

    const modelMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-slate-50 shadow-2xl overflow-hidden border-x border-slate-200">
      <ChatHeader />
      
      <main className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-none">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 flex gap-3 items-start shadow-sm">
          <div className="bg-amber-100 p-1.5 rounded-lg text-amber-700">
            <ShieldCheck size={18} />
          </div>
          <div className="text-[11px] leading-relaxed text-amber-800">
            <span className="font-bold uppercase block mb-0.5">Aviso Importante</span>
            Este guia é informativo e não substitui uma consulta médica. Em caso de febre forte, diarreia grave ou emergência, <strong>vá imediatamente ao Centro de Saúde mais próximo</strong>.
          </div>
        </div>

        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-slate-100 rounded-2xl px-4 py-3 flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {messages.length < 3 && !isLoading && (
          <div className="mt-6">
            <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tópicos Comuns</p>
            <QuickActions onAction={handleSendMessage} />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
