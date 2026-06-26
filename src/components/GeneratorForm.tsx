import React from 'react';
import { TabType, PaymentData } from '../types';
import { CreditCard, Landmark, User, DollarSign, FileText, AlertCircle } from 'lucide-react';

interface GeneratorFormProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  formData: PaymentData;
  setFormData: React.Dispatch<React.SetStateAction<PaymentData>>;
  errors: Record<string, string>;
}

export default function GeneratorForm({
  activeTab,
  setActiveTab,
  formData,
  setFormData,
  errors
}: GeneratorFormProps) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      let newValue = value;
      
      if (name === 'ifsc') {
        newValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 11);
      } else if (name === 'accountNo') {
        newValue = value.replace(/[^0-9]/g, '');
      } else if (name === 'amount') {
        // Allow numbers and single decimal point
        newValue = value.replace(/[^0-9.]/g, '');
        const dots = newValue.split('.').length - 1;
        if (dots > 1) {
          // If multiple dots, keep original
          return prev;
        }
      }
      
      return {
        ...prev,
        [name]: newValue
      };
    });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div id="payment-generator-form" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 md:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none transition-all duration-300">
      {/* Tab Switcher */}
      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl mb-8">
        <button
          id="tab-upi"
          onClick={() => handleTabChange('upi')}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'upi'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <CreditCard className={`w-4 h-4 ${activeTab === 'upi' ? 'text-emerald-500' : ''}`} />
          <span>UPI ID</span>
        </button>
        <button
          id="tab-bank"
          onClick={() => handleTabChange('bank')}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'bank'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Landmark className={`w-4 h-4 ${activeTab === 'bank' ? 'text-emerald-500' : ''}`} />
          <span>Bank Account</span>
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-6">
        {activeTab === 'upi' ? (
          <div>
            <label htmlFor="upiId" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Payee UPI ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={formData.upiId}
                onChange={handleInputChange}
                placeholder="e.g. name@okhdfcbank"
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 font-mono text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.upiId
                    ? 'border-red-500/50 focus:ring-red-500/20'
                    : 'border-slate-200 dark:border-slate-800/80 focus:border-emerald-500/50 focus:ring-emerald-500/10'
                }`}
              />
            </div>
            {errors.upiId ? (
              <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.upiId}</span>
              </p>
            ) : (
              <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
                Supports all handles: @okaxis, @yapl, @paytm, @icici, @upi, etc.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Number */}
            <div>
              <label htmlFor="accountNo" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Account Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="accountNo"
                  name="accountNo"
                  value={formData.accountNo || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. 987654321012"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 font-mono text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.accountNo
                      ? 'border-red-500/50 focus:ring-red-500/20'
                      : 'border-slate-200 dark:border-slate-800/80 focus:border-emerald-500/50 focus:ring-emerald-500/10'
                  }`}
                />
              </div>
              {errors.accountNo && (
                <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.accountNo}</span>
                </p>
              )}
            </div>

            {/* IFSC Code */}
            <div>
              <label htmlFor="ifsc" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                IFSC Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="ifsc"
                  name="ifsc"
                  value={formData.ifsc || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. HDFC0001234"
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 font-mono text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.ifsc
                      ? 'border-red-500/50 focus:ring-red-500/20'
                      : 'border-slate-200 dark:border-slate-800/80 focus:border-emerald-500/50 focus:ring-emerald-500/10'
                  }`}
                />
              </div>
              {errors.ifsc && (
                <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.ifsc}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Payee Name */}
        <div>
          <label htmlFor="payeeName" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Payee / Merchant Name {activeTab === 'bank' && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              id="payeeName"
              name="payeeName"
              value={formData.payeeName}
              onChange={handleInputChange}
              placeholder="e.g. Acme Corporation"
              className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950/40 border rounded-2xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.payeeName
                  ? 'border-red-500/50 focus:ring-red-500/20'
                  : 'border-slate-200 dark:border-slate-800/80 focus:border-emerald-500/50 focus:ring-emerald-500/10'
              }`}
            />
          </div>
          {errors.payeeName && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.payeeName}</span>
            </p>
          )}
        </div>

        {/* Amount & Note in side-by-side on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Amount (INR) <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="e.g. 500.00"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
              Leave blank to let customers type any amount they want.
            </p>
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Payment Note / Ref <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FileText className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="e.g. Invoice #250"
                maxLength={25}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300"
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
              Max 25 characters (some banking apps limit notes length).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
