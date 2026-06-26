import React from 'react';

interface AppLogo {
  name: string;
  logo: React.ReactNode;
}

const apps: AppLogo[] = [
  {
    name: 'Google Pay',
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Colorful GPay Logo lines */}
        <path d="M12.5 14.5C12.5 10.91 15.41 8 19 8H35V14.5H19V25.5H35V32H19C15.41 32 12.5 29.09 12.5 25.5V14.5Z" fill="#4285F4" />
        <rect x="39" y="8" width="6.5" height="24" rx="3.25" fill="#34A853" />
        <circle cx="54" cy="20" r="12" fill="#EA4335" />
        <circle cx="54" cy="20" r="6" fill="#FBBC05" />
        {/* Google Pay text */}
        <text x="68" y="26" fontFamily="sans-serif" fontWeight="bold" fontSize="16" fill="currentColor">Pay</text>
      </svg>
    )
  },
  {
    name: 'PhonePe',
    logo: (
      <svg className="h-7 w-auto" viewBox="0 0 120 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* PhonePe Purple Icon with Pe */}
        <rect x="2" y="2" width="31" height="31" rx="8" fill="#5f259f" />
        <path d="M11 25V9H18.5C21.5 9 23.5 10.5 23.5 13.5C23.5 16.5 21.5 18 18.5 18H14.5V25H11ZM14.5 14.5H18C19.2 14.5 20 14 20 13.5C20 13 19.2 12.5 18 12.5H14.5V14.5Z" fill="white" />
        <path d="M22 21C22 23.2 23.8 25 26 25C28.2 25 30 23.2 30 21V15H28V21C28 22.1 27.1 23 26 23C24.9 23 24 22.1 24 21V15H22V21Z" fill="#00baf2" />
        <text x="39" y="23" fontFamily="sans-serif" fontWeight="800" fontSize="15" fill="#5f259f" className="dark:fill-purple-300">PhonePe</text>
      </svg>
    )
  },
  {
    name: 'Paytm',
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Paytm stylized logo */}
        <text x="0" y="24" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#002E6E" className="dark:fill-blue-200">pay</text>
        <text x="40" y="24" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#00B9F5">tm</text>
        {/* Dynamic dots representing digital transactions */}
        <circle cx="82" cy="12" r="3" fill="#00B9F5" />
        <circle cx="92" cy="18" r="4" fill="#002E6E" className="dark:fill-blue-300" />
      </svg>
    )
  },
  {
    name: 'BHIM',
    logo: (
      <svg className="h-7 w-auto" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* BHIM Logo - Indian tricolor themed */}
        <path d="M5 6H15C19 6 21 8 21 11C21 13 19.5 14.5 17 15C19.5 15.5 21.5 17 21.5 20.5C21.5 23.5 19 25.5 15 25.5H5V6ZM10 13H14C15.5 13 16.5 12.5 16.5 11.5C16.5 10.5 15.5 10 14 10H10V13ZM10 21.5H14.5C16 21.5 17 21 17 20C17 19 16 18.5 14.5 18.5H10V21.5Z" fill="#F4811F" />
        <path d="M25 6H30V14.5H39V6H44V25.5H39V18.5H30V25.5H25V6Z" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" className="dark:stroke-slate-700" />
        <path d="M49 6H54V25.5H49V6Z" fill="#129947" />
        <path d="M59 6L69 19V6H74V25.5L64 12.5V25.5H59V6Z" fill="#129947" />
        <path d="M78 12L85 6L92 12" stroke="#129947" strokeWidth="3" strokeLinecap="round" />
        <path d="M78 19L85 13L92 19" stroke="#F4811F" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'CRED',
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* CRED minimalist design */}
        <rect x="2" y="2" width="28" height="28" rx="14" fill="currentColor" className="text-slate-900 dark:text-white" />
        <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="2" className="dark:stroke-black" />
        <text x="38" y="22" fontFamily="monospace" fontWeight="900" fontSize="16" letterSpacing="2" fill="currentColor" className="text-slate-900 dark:text-white">CRED</text>
      </svg>
    )
  },
  {
    name: 'Amazon Pay',
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 130 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Amazon Pay text and logo */}
        <text x="0" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="15" fill="currentColor" className="text-slate-800 dark:text-slate-100">amazon</text>
        <text x="62" y="21" fontFamily="sans-serif" fontWeight="light" fontSize="15" fill="#FF9900">pay</text>
        {/* Amazon iconic smile orange curve arrow */}
        <path d="M6 25C15 28 35 28 50 25C51 24.8 52 25.5 50.8 26.2C40 32.5 15 31.5 4 26.2C3 25.7 4.2 24.5 6 25Z" fill="#FF9900" />
        <path d="M51 22.5C49.5 22.8 48 23.5 46.5 24C45.8 24.2 46 25 46.8 24.8C48.5 24.2 50.2 23.2 52 23.5C52.5 23.6 52.5 22 51 22.5Z" fill="#FF9900" />
      </svg>
    )
  }
];

export default function Marquee() {
  // Multiply the apps array to ensure smooth continuous marquee scroll
  const marqueeItems = [...apps, ...apps, ...apps, ...apps];

  return (
    <div id="supported-apps-marquee" className="w-full py-8 bg-slate-50/50 dark:bg-slate-950/30 border-y border-slate-100 dark:border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-4">
        <p className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 text-center uppercase">
          Supported Apps & Networks
        </p>
      </div>
      <div className="relative flex items-center overflow-x-hidden">
        {/* Left & Right ambient fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        
        {/* Moving track */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 py-2">
            {marqueeItems.map((app, idx) => (
              <div
                key={`${app.name}-${idx}`}
                className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 filter"
                title={app.name}
              >
                {app.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
