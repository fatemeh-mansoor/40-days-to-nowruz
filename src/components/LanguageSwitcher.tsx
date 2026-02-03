import { useState, useRef, useEffect } from 'react';
import { Language } from '../hooks/useI18n';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  label: string;
}

const languages: Array<{ code: Language; name: string; nativeName: string; flagImage: string }> = [
  { code: 'en', name: 'English', nativeName: 'English', flagImage: '/flags/en.png' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flagImage: '/flags/fa.png' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flagImage: '/flags/es.png' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flagImage: '/flags/ca.png' },
];

/**
 * Language switcher component
 * Custom dropdown for selecting interface language with flag images
 */
export function LanguageSwitcher({ currentLanguage, onLanguageChange, label }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find(lang => lang.code === currentLanguage);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langCode: Language) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };
  
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm px-3 py-1.5 bg-white hover:bg-gray-50 transition-colors"
          aria-label={label}
          aria-expanded={isOpen}
        >
          {currentLang && (
            <>
              <img 
                src={currentLang.flagImage} 
                alt={currentLang.name}
                className="w-5 h-3.5 object-cover rounded"
              />
              <span>{currentLang.nativeName}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    lang.code === currentLanguage ? 'bg-green-50' : ''
                  }`}
                >
                  <img 
                    src={lang.flagImage} 
                    alt={lang.name}
                    className="w-5 h-3.5 object-cover rounded"
                  />
                  <span>{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
