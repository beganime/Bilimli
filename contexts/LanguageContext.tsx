import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLanguage, setLanguage, Language, getTranslation } from '../utils/storage';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslation>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLang] = useState<Language>('ru');
  const [t, setT] = useState(getTranslation('ru'));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const lang = await getLanguage();
    setLang(lang);
    setT(getTranslation(lang));
    setLoaded(true);
  };

  const changeLanguage = async (lang: Language) => {
    await setLanguage(lang);
    setLang(lang);
    setT(getTranslation(lang));
  };

  if (!loaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
