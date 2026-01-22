
import React from 'react';
import Chatbot from './components/Chatbot';
import AudioAssistant from './components/AudioAssistant';
import { TVACalculator, PCGExplorer } from './components/AccountingTools';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <i className="fas fa-chart-line text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-none">ComptaExpert AI</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Conformité France & PCG</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">Tableau de bord</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">Mes Documents</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">Paramètres</a>
            <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
              Mon Profil
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Welcome Section */}
          <div className="lg:col-span-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold mb-2">Bonjour, Cabinet Expertise</h2>
                <p className="text-blue-100 mb-6">
                  Prêt pour votre clôture mensuelle ? Notre IA est synchronisée avec les dernières lois de finance 2024.
                  Utilisez l'assistant vocal pour poser vos questions à l'oral en temps réel.
                </p>
                <div className="flex gap-4">
                  <button className="bg-white text-blue-700 px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-blue-50">
                    Nouveau Journal
                  </button>
                  <button className="bg-blue-500/30 text-white border border-white/20 px-6 py-2.5 rounded-xl font-bold text-sm backdrop-blur hover:bg-blue-500/40">
                    Dernières Lois
                  </button>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
                 <i className="fas fa-file-invoice-dollar text-[200px] rotate-12 -mr-12 -mt-12"></i>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="lg:col-span-4 space-y-8">
            <TVACalculator />
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fas fa-bell text-orange-500"></i>
                Rappels Fiscaux
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 mt-1.5 bg-red-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="font-semibold">Déclaration TVA M-1</p>
                    <p className="text-slate-500 text-xs">Échéance dans 3 jours (le 15)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="font-semibold">Bilan Pédagogique (BFP)</p>
                    <p className="text-slate-500 text-xs">À transmettre via EDOF</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <PCGExplorer />
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-lightbulb text-yellow-500"></i>
                  Conseils IA du jour
                </h3>
                <div className="prose prose-sm text-slate-600 space-y-4">
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="font-bold text-yellow-800 mb-1">Assistant Vocal Actif</p>
                    <p className="text-xs">
                      Cliquez sur le micro en bas à droite pour activer le mode "Live". Idéal pour discuter de cas complexes sans taper de texte.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <p className="font-bold text-green-800 mb-1">Cession d'immobilisation</p>
                    <p className="text-xs">
                      Attention à la régularisation de la TVA si la cession intervient avant le délai de 5 ou 20 ans selon le type de bien.
                    </p>
                  </div>
                  <button className="w-full py-2 text-blue-600 text-xs font-bold border border-blue-200 rounded-lg hover:bg-blue-50">
                    Voir plus de conseils
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600/20 p-1 rounded">
              <i className="fas fa-chart-line text-blue-500"></i>
            </div>
            <span className="font-bold text-white">ComptaExpert AI</span>
          </div>
          <p className="text-xs">© 2024 ComptaExpert AI. Outils d'aide à la décision comptable. Non substituable au conseil d'un Expert-Comptable inscrit à l'Ordre.</p>
          <div className="flex gap-4">
            <i className="fab fa-twitter hover:text-white cursor-pointer"></i>
            <i className="fab fa-linkedin hover:text-white cursor-pointer"></i>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <AudioAssistant />
      <Chatbot />
    </div>
  );
};

export default App;
