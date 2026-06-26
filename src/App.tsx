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
import { CreditCard, Landmark, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

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
      
      {/* Dynamic Ambient Gradient glow for Hero background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-radial from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none blur-3xl z-0" />

      {/* Main Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <span className="font-display font-black text-xl tracking-tighter">EP</span>
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
            Exact <span className="text-emerald-500">Pay</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Quick status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Official UPI Spec</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>No Signup • No Commissions • 100% Secure</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Free UPI QR Code & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 dark:from-emerald-400 dark:to-teal-500">
              Payment Link Generator
            </span>
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
