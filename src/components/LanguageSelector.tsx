import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'FR', name: 'Français' },
  { code: 'ES', name: 'Español' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'IT', name: 'Italiano' },
  { code: 'PT', name: 'Português' },
  { code: 'AR', name: 'العربية' },
  { code: 'ZH', name: '中文' },
  { code: 'JA', name: '日本語' },
  { code: 'TR', name: 'Türkçe' },
];

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read the active language from the Google Translate cookie on mount
  useEffect(() => {
    const readCookie = () => {
      const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
      if (match && match[1]) {
        const code = match[1].toUpperCase();
        const exists = LANGUAGES.some((l) => l.code === code);
        if (exists) {
          setActiveLang(code);
        } else {
          setActiveLang(code); // Fallback to raw code
        }
      } else {
        setActiveLang('EN');
      }
    };

    readCookie();

    // Event listener for click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (code: string) => {
    const lowerLang = code.toLowerCase();
    const cookieVal = `/en/${lowerLang}`;

    // Get current host parts to clean cookie at higher scopes
    const host = window.location.hostname;
    const parts = host.split('.');
    const domain = parts.length > 1 ? `.${parts.slice(-2).join('.')}` : '';

    // Array of paths and domains to write the cookie to
    const targetDomains = [
      '',
      `; domain=${host}`,
      domain ? `; domain=${domain}` : ''
    ];

    if (code === 'EN') {
      // Deleting cookie to revert back to English
      targetDomains.forEach((d) => {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;${d}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/index.html;${d}`;
      });
    } else {
      // Writing target translation cookie
      targetDomains.forEach((d) => {
        document.cookie = `googtrans=${cookieVal}; path=/;${d}`;
      });
    }

    setActiveLang(code);
    setIsOpen(false);
    
    // Refresh page to apply translation instantly
    window.location.reload();
  };

  return (
    <div className="relative z-50 shrink-0" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-accent/40 rounded-xl px-3 py-1.5 text-xs text-white font-bold transition-all cursor-pointer shadow-md select-none"
      >
        <Globe className="w-3.5 h-3.5 text-accent shrink-0" />
        <span className="tracking-wide uppercase">{activeLang}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-950/95 border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden animate-fade-in py-1">
          <div className="max-h-56 overflow-y-auto scrollbar-hide">
            {LANGUAGES.map((lang) => {
              const isSelected = activeLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-accent/15 text-accent font-extrabold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-[10px] opacity-65">{lang.code}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
