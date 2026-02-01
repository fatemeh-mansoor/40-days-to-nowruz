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
 * Accessible dropdown for selecting interface language
 */
export function LanguageSwitcher({ currentLanguage, onLanguageChange, label }: LanguageSwitcherProps) {
  const currentLang = languages.find(lang => lang.code === currentLanguage);
  
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {currentLang && (
          <img 
            src={currentLang.flagImage} 
            alt={currentLang.name}
            className="w-5 h-3.5 object-cover rounded absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
          />
        )}
        <select
          id="language-select"
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm pl-10 pr-8 py-1.5 border appearance-none bg-white"
          aria-label={label}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
