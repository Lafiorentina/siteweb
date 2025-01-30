import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-white" role="region" aria-label="Language selection">
      <button
        onClick={() => setLanguage('pt')}
        className={`px-2 py-1 rounded transition-colors ${
          language === 'pt'
            ? 'bg-[#bd1e23]'
            : 'hover:bg-white/10'
        }`}
        aria-pressed={language === 'pt'}
        aria-label="Portuguese"
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded transition-colors ${
          language === 'en'
            ? 'bg-[#bd1e23]'
            : 'hover:bg-white/10'
        }`}
        aria-pressed={language === 'en'}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}