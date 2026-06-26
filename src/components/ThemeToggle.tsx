import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPreference ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 shadow-xs hover:shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="w-6 h-6 text-slate-800 fill-slate-800 stroke-[2.5] transition-transform hover:rotate-45 duration-300" />
      ) : (
        <Moon className="w-5.5 h-5.5 text-slate-200 fill-slate-200 stroke-[1] transition-transform hover:-rotate-12 duration-300" />
      )}
    </button>
  );
}
