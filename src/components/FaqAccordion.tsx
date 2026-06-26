import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

const faqList: FAQItem[] = [
  {
    question: 'What is a UPI payment link and how does it work?',
    answer: 'A UPI payment link is a standardized uniform resource identifier (URI) starting with "upi://pay". When a user clicks this link on a mobile device, or scans a QR code representing this link, it automatically opens any installed UPI application (like GPay, PhonePe, Paytm, or BHIM) and auto-populates the payee name, UPI address, amount, and transaction note, ready for direct pin input.'
  },
  {
    question: 'Is there a cost or transaction limit using Exact Pay?',
    answer: 'No, Exact Pay is completely free. We do not charge transaction commissions or subscription fees. Any limits on transactions depend entirely on your bank account types or the daily threshold established by your specific UPI app and NPCI guidelines (usually ₹1,00,000 per day).'
  },
  {
    question: 'How is my private financial data secured?',
    answer: 'Exact Pay is 100% serverless and private. All calculations, URL building, and QR canvas rendering happen instantly on your device inside your web browser. None of your banking data, UPI IDs, names, or transaction parameters are ever sent to, processed by, or stored on any server.'
  },
  {
    question: 'How does the "Bank Account" tab work for UPI?',
    answer: 'NPCI allows direct bank payments via UPI using a virtual address formatted as "AccountNumber@IFSC.ifsc.npci". When you enter your Account Number and IFSC code, we automatically translate it into this standard NPCI address. Supported apps like BHIM, PhonePe, and others will process this as a direct IMPS/UPI bank transfer!'
  },
  {
    question: 'Which apps support scanning the downloaded QR code?',
    answer: 'Any standard, BHIM-compliant UPI mobile application supports scanning our generated QR codes. This includes popular applications such as Google Pay (GPay), PhonePe, Paytm, BHIM, CRED, Amazon Pay, Mobikwik, and all official banking apps (YONO SBI, iMobile, HDFC PayZapp, etc.).'
  },
  {
    question: 'Can I print the downloaded QR codes for my physical shop?',
    answer: 'Yes! Our "Download QR" feature generates a high-resolution, stylish, and contrast-optimized JPEG (.jpg) file specifically designed for clear print and screen rendering. You can print it as stickers, table displays, or share it on WhatsApp/Telegram so customers can pay your shop instantly.'
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4 border border-emerald-100 dark:border-emerald-900/40">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frictionless Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base md:text-lg">
            Got questions? We have clear answers to help you understand UPI generation.
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>
                
                {/* Accordion Content wrapper with smooth height transition */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 border-t border-slate-50 dark:border-slate-800/50 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="px-6 py-5 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed bg-slate-50/50 dark:bg-slate-900/30">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
