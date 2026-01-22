
import React, { useState, useMemo } from 'react';
import { TVARate, PCGAccount } from '../types';
import { SIMPLIFIED_PCG, TVA_LABELS } from '../constants';

export const TVACalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [mode, setMode] = useState<'HT' | 'TTC'>('HT');
  const [rate, setRate] = useState<number>(TVARate.NORMAL);

  const results = useMemo(() => {
    const val = parseFloat(amount) || 0;
    if (mode === 'HT') {
      const tva = val * rate;
      return { ht: val, tva, ttc: val + tva };
    } else {
      const ht = val / (1 + rate);
      return { ht, tva: val - ht, ttc: val };
    }
  }, [amount, mode, rate]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <i className="fas fa-calculator text-blue-500"></i>
        Calculateur de TVA
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          <button 
            onClick={() => setMode('HT')}
            className={`flex-1 py-1 text-sm font-medium rounded ${mode === 'HT' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Base HT
          </button>
          <button 
            onClick={() => setMode('TTC')}
            className={`flex-1 py-1 text-sm font-medium rounded ${mode === 'TTC' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Base TTC
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Montant {mode}</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Taux applicable</label>
          <select 
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {Object.entries(TVA_LABELS).map(([r, label]) => (
              <option key={r} value={r}>{label}</option>
            ))}
          </select>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Montant HT</span>
            <span className="font-mono font-semibold">{results.ht.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Montant TVA</span>
            <span className="font-mono font-semibold text-blue-600">{results.tva.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2">
            <span className="text-slate-800">TOTAL TTC</span>
            <span className="font-mono text-green-600">{results.ttc.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PCGExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return SIMPLIFIED_PCG.filter(a => a.code.includes(s) || a.label.toLowerCase().includes(s));
  }, [search]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <i className="fas fa-book text-blue-500"></i>
        Plan Comptable (Extraits)
      </h3>

      <div className="mb-4">
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Chercher un compte ou libellé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-white">
            <tr className="text-xs font-semibold text-slate-500 border-b">
              <th className="pb-2">Code</th>
              <th className="pb-2">Libellé</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(acc => (
              <tr key={acc.code} className="hover:bg-slate-50 group">
                <td className="py-2 text-sm font-mono font-bold text-blue-600">{acc.code}</td>
                <td className="py-2 text-sm text-slate-600">{acc.label}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={2} className="py-8 text-center text-slate-400 text-sm">Aucun compte trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
