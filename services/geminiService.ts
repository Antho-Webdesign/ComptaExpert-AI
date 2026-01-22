
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es un expert en comptabilité française, fiscalité et droit des affaires. 
Tes réponses doivent être basées sur le Plan Comptable Général (PCG) français et le Code Général des Impôts (CGI).
Sois précis, professionnel et cite les articles de loi ou les numéros de compte PCG quand c'est pertinent.
N'hésite pas à demander des précisions si la situation de l'utilisateur est ambiguë (ex: régime réel vs micro-entreprise).
Réponds toujours en français.
`;

export class AccountingAI {
  private chat: Chat;

  constructor() {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }

  async ask(question: string): Promise<string> {
    try {
      const result: GenerateContentResponse = await this.chat.sendMessage({ message: question });
      return result.text || "Désolé, je n'ai pas pu générer de réponse.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Une erreur est survenue lors de la communication avec l'assistant IA. Veuillez vérifier votre connexion.";
    }
  }

  async *askStream(question: string) {
    try {
      const stream = await this.chat.sendMessageStream({ message: question });
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        yield c.text;
      }
    } catch (error) {
      console.error("Gemini Streaming Error:", error);
      yield "Erreur lors du chargement de la réponse...";
    }
  }
}
