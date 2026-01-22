
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { createBlob, decodeAudio, decodeAudioData } from '../services/audioService';

const AudioAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'speaking'>('idle');
  
  const sessionRef = useRef<any>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    setStatus('idle');
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            setStatus('listening');
            
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message) => {
            const audioBase64 = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioBase64 && outputAudioContextRef.current) {
              setStatus('speaking');
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(
                decodeAudio(audioBase64),
                ctx,
                24000,
                1
              );
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }
          },
          onerror: (e) => {
            console.error('Audio Assistant Error:', e);
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: "Tu es un assistant vocal expert en comptabilité française. Réponds de manière concise et professionnelle. Aide l'utilisateur avec le Plan Comptable Général, la TVA et les obligations fiscales françaises."
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start audio session:', err);
      setIsConnecting(false);
      alert("Impossible d'accéder au microphone ou de se connecter au service vocal.");
    }
  };

  const toggleAssistant = () => {
    if (isActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-50 flex items-center gap-3">
      {isActive && (
        <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-3 animate-fade-in">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`w-1 h-4 bg-blue-600 rounded-full ${status === 'speaking' ? 'animate-bounce' : status === 'listening' ? 'animate-pulse' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            {status === 'speaking' ? 'L\'IA vous répond' : 'À votre écoute'}
          </span>
        </div>
      )}
      
      <button
        onClick={toggleAssistant}
        disabled={isConnecting}
        className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white transition-all transform hover:scale-105 ${
          isActive ? 'bg-red-500' : 'bg-indigo-600'
        } ${isConnecting ? 'animate-pulse opacity-70' : ''}`}
      >
        {isConnecting ? (
          <i className="fas fa-spinner animate-spin text-2xl"></i>
        ) : isActive ? (
          <i className="fas fa-microphone-slash text-2xl"></i>
        ) : (
          <i className="fas fa-microphone text-2xl"></i>
        )}
      </button>
    </div>
  );
};

export default AudioAssistant;
