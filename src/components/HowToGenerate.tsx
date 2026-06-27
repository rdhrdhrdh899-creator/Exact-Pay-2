import React from 'react';
import { ClipboardList, Palette, Share2 } from 'lucide-react';

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: <ClipboardList className="w-6 h-6 text-emerald-500" />,
    title: 'Input Your Details',
    description: 'Select either the "UPI ID" or "Bank Account" tab and fill out the payment details like payee name, amount, and purpose.'
  },
  {
    number: '02',
    icon: <Palette className="w-6 h-6 text-emerald-500" />,
    title: 'Choose a Styling Theme',
    description: 'Pick an elegant, custom-designed color gradient that matches your brand style or business mood instantly.'
  },
  {
    number: '03',
    icon: <Share2 className="w-6 h-6 text-emerald-500" />,
    title: 'Download & Share',
    description: 'Instantly download your custom QR code for Payment, or copy/share the clean, clickable payment link.'
  }
];

export default function HowToGenerate() {
  return (
    <section id="how-to-generate" className="py-20 px-4 md:px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            How to Generate in <span className="text-emerald-500">3 Simple Steps</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Create completely custom digital payment points in less than 10 seconds.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop layout */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-dashed bg-slate-200 dark:bg-slate-800 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  {/* Step number badge */}
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center shadow-md">
                    {step.number}
                  </span>
                  {/* Icon container */}
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
