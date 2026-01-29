import { Language } from '../hooks/useI18n';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  label: string;
}

const languages: Array<{ code: Language; name: string; nativeName: string }> = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català' },
];

/**
 * Language switcher component
 * Accessible dropdown for selecting interface language
 */
export function LanguageSwitcher({ currentLanguage, onLanguageChange, label }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="block rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm px-3 py-1.5 border"
        aria-label={label}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}
