/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Você é um Assistente de Saúde Comunitária especializado no contexto de Moçambique e outros países da África Subsariana. 
Seu objetivo é fornecer informações claras, acessíveis e confiáveis sobre Malária, Cólera e Saúde Reprodutiva.

DIRETRIZES DE RESPOSTA:
1. CONTEXTO LOCAL: Use termos e referências comuns em Moçambique (ex: mencionar Unidades de Saúde locais, centros de saúde, redes mosquiteiras, água fervida).
2. TÓPICOS:
   - MALÁRIA: Prevenção (redes, roupa comprida), sintomas (febre, calafrios), importância do teste rápido (TDR) e tratamento imediato.
   - CÓLERA: Higiene (lavagem de mãos, Certeza), prevenção, sintomas (diarreia líquida grave), reidratação oral (SRO).
   - SAÚDE REPRODUTIVA: Planeamento familiar, prevenção de ISTs, cuidados pré-natais, higiene menstrual.
3. LINGUAGEM: Use português de Moçambique claro e empático. Evite termos médicos excessivamente complexos sem explicação.
4. AVISO CRÍTICO: SEMPRE inclua um aviso de que você é uma IA e que o usuário deve procurar um profissional de saúde ou ir ao centro de saúde mais próximo para diagnóstico e tratamento.
5. ESTRUTURA: Use listas e negrito para facilitar a leitura em ecrãs pequenos (telemóveis).
6. LIMITAÇÕES: Se o usuário perguntar sobre algo fora destes temas ou muito complexo, recomende gentilmente a consulta médica.

Persona: Amigável, respeitoso, informativo e focado na prevenção comunitária.`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateResponse(history: { role: 'user' | 'model'; parts: { text: string }[] }[], message: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map(h => ({ role: h.role, parts: h.parts })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.95,
        },
      });

      return response.text || "Desculpe, tive um problema ao processar sua resposta. Por favor, tente novamente.";
    } catch (error) {
      console.error("Error generating response:", error);
      return "Ocorreu um erro ao comunicar com o servidor de saúde. Por favor, verifique sua conexão.";
    }
  }
}

export const geminiService = new GeminiService();
