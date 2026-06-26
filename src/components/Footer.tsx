import { Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-slate-900 text-slate-400 py-12 px-4 md:px-6 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Information */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Exact <span className="text-emerald-500">Pay</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xs">
            Free, fast, and secure UPI QR code & payment link generator. Made for small businesses, freelancers, and everyday payers.
          </p>
        </div>

        {/* Security Declaration */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-800 text-xs text-slate-300">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>No Server Storage • 100% Client-Side Privacy</span>
        </div>

        {/* System info / Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
          <p className="text-xs">
            &copy; {currentYear} Exact Pay. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500/80" />
            <span>Powering Digital Payments with UPIpe</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
