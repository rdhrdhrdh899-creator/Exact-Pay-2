import { useState, useEffect } from 'react';
import { TabType, PaymentData } from './types';
import ThemeToggle from './components/ThemeToggle';
import Marquee from './components/Marquee';
import GeneratorForm from './components/GeneratorForm';
import QRResult from './components/QRResult';
import WhyExactPay from './components/WhyExactPay';
import HowToGenerate from './components/HowToGenerate';
import FaqAccordion from './components/FaqAccordion';
import Footer from './components/Footer';
import { CreditCard, Landmark, CheckCircle2, ShieldCheck, HelpCircle, Menu, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('upi');
  const [formData, setFormData] = useState<PaymentData>({
    upiId: '',
    payeeName: '',
    amount: '',
    note: '',
    accountNo: '',
    ifsc: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Typing effect phrases
  const phrases = [
    "Payment Link Generator",
    "Instant UPI QR Code",
    "No-Setup Merchant QR",
    "Seamless Business Pay"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = phrases[currentPhraseIndex];

    if (!isDeleting) {
      // Typing mode
      if (typedText !== currentFullText) {
        timer = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length + 1));
        }, 80);
      } else {
        // Finished typing, wait then delete
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Deleting mode
      if (typedText !== '') {
        timer = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length - 1));
        }, 35);
      } else {
        // Finished deleting, shift index
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentPhraseIndex]);

  // Track scroll progress to update progress line at top of page
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Validate the form parameters reactively as they type
  useEffect(() => {
    const nextErrors: Record<string, string> = {};
    let valid = true;

    if (activeTab === 'upi') {
      const upi = (formData.upiId || '').trim();
      if (!upi) {
        nextErrors.upiId = 'UPI ID is required';
        valid = false;
      } else if (!upi.includes('@')) {
        nextErrors.upiId = 'UPI ID must contain a valid handle (e.g. @okaxis)';
        valid = false;
      } else {
        const parts = upi.split('@');
        if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
          nextErrors.upiId = 'Please enter a valid UPI address format';
          valid = false;
        }
      }
    } else {
      // Bank Account validation
      const acc = (formData.accountNo || '').trim();
      const ifsc = (formData.ifsc || '').trim().toUpperCase();
      const name = (formData.payeeName || '').trim();

      if (!acc) {
        nextErrors.accountNo = 'Bank account number is required';
        valid = false;
      } else if (acc.length < 9 || acc.length > 18) {
        nextErrors.accountNo = 'Account number must be between 9 and 18 digits';
        valid = false;
      }

      if (!ifsc) {
        nextErrors.ifsc = 'IFSC code is required';
        valid = false;
      } else if (ifsc.length !== 11) {
        nextErrors.ifsc = 'IFSC code must be exactly 11 characters long';
        valid = false;
      }

      if (!name) {
        nextErrors.payeeName = 'Payee name is required for direct bank transfers';
        valid = false;
      }
    }

    setErrors(nextErrors);
    setIsValid(valid);
  }, [formData, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      
      {/* Scroll Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-75 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Dynamic Ambient Gradient glow for Hero background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-radial from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none blur-3xl z-0" />

      {/* Main Header */}
      <header className="relative z-50 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 sticky top-0 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          
          {/* Brand Logo with gradient icon and Exact Pay title */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 transform group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full text-emerald-600 dark:text-emerald-400 fill-none stroke-current"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* QR-style Outer frame with elegant gaps */}
                <path d="M 32,12 H 18 A 6,6 0 0,0 12,18 V 32" />
                <path d="M 68,12 H 82 A 6,6 0 0,1 88,18 V 32" />
                <path d="M 12,68 V 82 A 6,6 0 0,0 18,88 H 32" />
                <path d="M 88,68 V 82 A 6,6 0 0,1 82,88 H 68" />

                {/* Finder Patterns (Top-Left, Top-Right, Bottom-Left) */}
                <rect x="20" y="20" width="16" height="16" rx="3.5" strokeWidth="5" />
                <rect x="25" y="25" width="6" height="6" rx="1" fill="currentColor" stroke="none" />
                
                <rect x="64" y="20" width="16" height="16" rx="3.5" strokeWidth="5" />
                <rect x="69" y="25" width="6" height="6" rx="1" fill="currentColor" stroke="none" />

                <rect x="20" y="64" width="16" height="16" rx="3.5" strokeWidth="5" />
                <rect x="25" y="69" width="6" height="6" rx="1" fill="currentColor" stroke="none" />

                {/* Center Badge with Checkmark + Upward Arrow (The Exact Pay Emblem) */}
                <circle cx="50" cy="50" r="17" className="stroke-teal-600 dark:stroke-teal-400 fill-white dark:fill-slate-950" strokeWidth="4.5" />
                {/* The Checkmark that extends into an Arrow Head */}
                <path 
                  d="M 42,50 L 47,55 L 56,43" 
                  className="stroke-emerald-500 dark:stroke-emerald-400" 
                  strokeWidth="5" 
                />
                {/* Arrow-head tip on the right side of the checkmark */}
                <path 
                  d="M 50,43 H 56 V 49" 
                  className="stroke-emerald-500 dark:stroke-emerald-400" 
                  strokeWidth="4.5" 
                />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                  EXACT
                </span>
                <span className="font-display font-black text-xl tracking-tight text-emerald-500 dark:text-emerald-400 leading-none">
                  PAY
                </span>
              </div>
              <span className="text-[8.5px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-1 leading-none">
                Secure QR & Payments
              </span>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#payment-generator-form" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200">
              Generator
            </a>
            <a href="#why-exact-pay" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200">
              Why Exact Pay
            </a>
            <a href="#how-to-generate" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200">
              How It Works
            </a>
            <a href="#faq" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200">
              FAQ
            </a>
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#payment-generator-form"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-300 text-sm tracking-wide flex items-center gap-1"
            >
              Generate Free →
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Hamburguer Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-100 dark:border-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 px-4 py-6 flex flex-col gap-5 text-base font-semibold animate-slideDown shadow-xl">
            <a
              href="#payment-generator-form"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 py-1 transition-colors"
            >
              Generator
            </a>
            <a
              href="#why-exact-pay"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 py-1 transition-colors"
            >
              Why Exact Pay
            </a>
            <a
              href="#how-to-generate"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 py-1 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 py-1 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#payment-generator-form"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-full shadow-lg shadow-emerald-500/20"
            >
              Generate Free →
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>No Signup • No Commissions • 100% Secure</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight min-h-[96px] sm:min-h-[120px] md:min-h-[144px]">
            Free UPI QR Code & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 dark:from-emerald-400 dark:to-teal-500">
              {typedText}
            </span>
            <span className="inline-block ml-1 text-emerald-500 dark:text-emerald-400 animate-pulse">|</span>
          </h1>
          <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Instantly generate scannable digital payment badges and direct links. Perfect for merchants, freelancers, and small businesses.
          </p>
        </div>
      </section>

      {/* Main Generator Workspace */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side (Column span 7) */}
          <div className="lg:col-span-7">
            <GeneratorForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          </div>

          {/* QR & Action Output Side (Column span 5) */}
          <div className="lg:col-span-5">
            <QRResult
              activeTab={activeTab}
              formData={formData}
              isValid={isValid}
            />
          </div>

        </div>
      </main>

      {/* Infinite scrolling brand marquee */}
      <Marquee />

      {/* Why Exact Pay Features Grid */}
      <WhyExactPay />

      {/* Step by Step Generation Guide */}
      <HowToGenerate />

      {/* FAQ Accordion Support */}
      <FaqAccordion />

      {/* Footer */}
      <Footer />

    </div>
  );
}
