import React from 'react';
import { Zap, ShieldCheck, HeartHandshake, RefreshCw, Smartphone, Award } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="w-6 h-6 text-emerald-500" />,
    title: 'Instant Generation',
    description: 'Get your QR code and payment link in microseconds. It generates in real-time as you type, with zero loading states.'
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-emerald-500" />,
    title: '100% Free Forever',
    description: 'No subscriptions, no hidden convenience fees, and no feature limits. We believe financial accessibility should be free.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    title: 'Privacy Preserved',
    description: 'Your data is 100% yours. We do not store your UPI ID, bank account numbers, or transaction details on any server.'
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-emerald-500" />,
    title: 'Direct Settlements',
    description: 'We do not act as middlemen. Funds transfer directly from the payer to your connected bank account or UPI address.'
  },
  {
    icon: <Smartphone className="w-6 h-6 text-emerald-500" />,
    title: 'Universal Compatibility',
    description: 'Generates standard, NPCI-compliant UPI links that work seamlessly across GPay, PhonePe, Paytm, BHIM, and CRED.'
  },
  {
    icon: <Award className="w-6 h-6 text-emerald-500" />,
    title: 'Stylish Downloads',
    description: 'Download highly polished QR code templates in .jpg format, perfect for printing, shop displays, or sharing on messaging apps.'
  }
];

export default function WhyExactPay() {
  return (
    <section id="why-exact-pay" className="py-20 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Why Hundreds of Merchants Choose <span className="text-emerald-500">Exact Pay</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            A frictionless payment experience engineered to be incredibly fast, secure, and beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:shadow-xl hover:shadow-slate-100/30 dark:hover:shadow-none transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
