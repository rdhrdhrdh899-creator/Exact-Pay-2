import QRCode from 'qrcode';
import { PaymentData, QRTheme } from './types';

// Standard themes for QR styling
export const qrThemes: QRTheme[] = [
  {
    id: 'emerald',
    name: 'Emerald Zen',
    bgGradient: 'from-emerald-500 to-teal-600',
    primaryColor: '#10b981',
    textColor: '#ffffff',
    qrColor: '#064e3b',
  },
  {
    id: 'blue',
    name: 'Royal Ocean',
    bgGradient: 'from-blue-600 to-indigo-700',
    primaryColor: '#2563eb',
    textColor: '#ffffff',
    qrColor: '#1e3a8a',
  },
  {
    id: 'rose',
    name: 'Sunset Rose',
    bgGradient: 'from-rose-500 via-pink-500 to-orange-500',
    primaryColor: '#f43f5e',
    textColor: '#ffffff',
    qrColor: '#881337',
  },
  {
    id: 'amber',
    name: 'Warm Amber',
    bgGradient: 'from-amber-500 to-orange-600',
    primaryColor: '#f59e0b',
    textColor: '#ffffff',
    qrColor: '#78350f',
  },
  {
    id: 'dark',
    name: 'Cosmic Slate',
    bgGradient: 'from-slate-800 to-slate-950',
    primaryColor: '#475569',
    textColor: '#ffffff',
    qrColor: '#0f172a',
  },
  {
    id: 'minimal',
    name: 'Sleek Light',
    bgGradient: 'from-slate-50 to-slate-100 border border-slate-200',
    primaryColor: '#1e293b',
    textColor: '#1e293b',
    qrColor: '#1e293b',
  }
];

// Helper to construct the UPI URL
export function generateUpiUrl(tab: 'upi' | 'bank', data: PaymentData): string {
  let pa = '';
  if (tab === 'upi') {
    pa = data.upiId.trim();
  } else {
    // Standard direct-to-account UPI format supported by BHIM and NPCI
    // AccountNo@IFSC.ifsc.npci
    const acc = (data.accountNo || '').trim();
    const ifsc = (data.ifsc || '').trim().toUpperCase();
    pa = `${acc}@${ifsc}.ifsc.npci`;
  }

  const name = (data.payeeName || '').trim();
  const amt = (data.amount || '').trim();
  const note = (data.note || '').trim();

  // Create the parameter map
  const params: string[] = [];
  params.push(`pa=${pa}`);
  
  if (name) {
    params.push(`pn=${encodeURIComponent(name)}`);
  }
  if (amt) {
    // Format to 2 decimal places if it's a number
    const num = parseFloat(amt);
    if (!isNaN(num)) {
      params.push(`am=${num.toFixed(2)}`);
    } else {
      params.push(`am=${amt}`);
    }
  }
  if (note) {
    params.push(`tn=${encodeURIComponent(note)}`);
  }
  
  // Set default currency to INR
  params.push('cu=INR');

  return `upi://pay?${params.join('&')}`;
}

// Generate the high-resolution QR image with exact stylish background theme and "by UPIpe" text in bottom
export async function downloadStyledQR(
  tab: 'upi' | 'bank',
  data: PaymentData,
  themeId: string
): Promise<void> {
  const upiUrl = generateUpiUrl(tab, data);
  const theme = qrThemes.find((t) => t.id === themeId) || qrThemes[0];

  // 1. Generate standard QR code as a data URL using the qrcode library
  const qrDataUrl = await QRCode.toDataURL(upiUrl, {
    margin: 1,
    width: 600,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });

  // 2. Set up HTML Canvas in memory for rendering
  const canvasWidth = 800;
  const canvasHeight = 1100;
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // 3. Draw Background Gradient/Color
  if (theme.id === 'minimal') {
    // Draw plain elegant white background with subtle border
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 16;
    ctx.strokeRect(8, 8, canvasWidth - 16, canvasHeight - 16);
  } else {
    // Create elegant gradient matching the selected theme
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    if (theme.id === 'emerald') {
      gradient.addColorStop(0, '#10b981'); // emerald-500
      gradient.addColorStop(1, '#0f766e'); // teal-700
    } else if (theme.id === 'blue') {
      gradient.addColorStop(0, '#2563eb'); // blue-600
      gradient.addColorStop(1, '#1d4ed8'); // blue-700
    } else if (theme.id === 'rose') {
      gradient.addColorStop(0, '#f43f5e'); // rose-500
      gradient.addColorStop(0.5, '#ec4899'); // pink-500
      gradient.addColorStop(1, '#f97316'); // orange-500
    } else if (theme.id === 'amber') {
      gradient.addColorStop(0, '#f59e0b'); // amber-500
      gradient.addColorStop(1, '#ea580c'); // orange-600
    } else if (theme.id === 'dark') {
      gradient.addColorStop(0, '#1e293b'); // slate-800
      gradient.addColorStop(1, '#020617'); // slate-950
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  // 4. Draw Header Card/Details
  ctx.textAlign = 'center';
  ctx.fillStyle = theme.id === 'minimal' ? '#0f172a' : '#ffffff';

  // App Logo
  ctx.font = 'bold 42px "Space Grotesk", "Inter", sans-serif';
  ctx.fillText('Exact Pay', canvasWidth / 2, 90);

  // Subtitle
  ctx.font = '500 24px "Inter", sans-serif';
  ctx.fillStyle = theme.id === 'minimal' ? '#64748b' : 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('SCAN TO PAY WITH ANY UPI APP', canvasWidth / 2, 135);

  // 5. Draw White Card Container for the QR Code
  const cardWidth = 520;
  const cardHeight = 520;
  const cardX = (canvasWidth - cardWidth) / 2;
  const cardY = 190;
  const cardRadius = 32;

  // Render Card Shadow (if not minimal theme)
  if (theme.id !== 'minimal') {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;
  }

  // Draw Rounded White Card
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(cardX + cardRadius, cardY);
  ctx.lineTo(cardX + cardWidth - cardRadius, cardY);
  ctx.arcTo(cardX + cardWidth, cardY, cardX + cardWidth, cardY + cardRadius, cardRadius);
  ctx.lineTo(cardX + cardWidth, cardY + cardHeight - cardRadius);
  ctx.arcTo(cardX + cardWidth, cardY + cardHeight, cardX + cardWidth - cardRadius, cardY + cardHeight, cardRadius);
  ctx.lineTo(cardX + cardRadius, cardY + cardHeight);
  ctx.arcTo(cardX, cardY + cardHeight, cardX, cardY + cardHeight - cardRadius, cardRadius);
  ctx.lineTo(cardX, cardY + cardRadius);
  ctx.arcTo(cardX, cardY, cardX + cardRadius, cardY, cardRadius);
  ctx.closePath();
  ctx.fill();

  // Reset shadow for subsequent elements
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // 6. Draw QR Code Image Inside Card
  const qrImg = new Image();
  qrImg.src = qrDataUrl;
  await new Promise((resolve) => {
    qrImg.onload = resolve;
  });

  const qrMargin = 40;
  ctx.drawImage(
    qrImg,
    cardX + qrMargin,
    cardY + qrMargin,
    cardWidth - qrMargin * 2,
    cardHeight - qrMargin * 2
  );

  // 7. Draw Transaction / Payee details text below the QR card
  const textStartY = 780;
  ctx.fillStyle = theme.id === 'minimal' ? '#1e293b' : '#ffffff';

  // Payee Name
  if (data.payeeName) {
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.fillText(data.payeeName.trim(), canvasWidth / 2, textStartY);
  } else {
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.fillText('UPI Payment', canvasWidth / 2, textStartY);
  }

  // UPI ID or Account Details
  ctx.font = '500 24px "JetBrains Mono", monospace';
  ctx.fillStyle = theme.id === 'minimal' ? '#475569' : 'rgba(255, 255, 255, 0.9)';
  
  if (tab === 'upi') {
    ctx.fillText(data.upiId.trim(), canvasWidth / 2, textStartY + 45);
  } else {
    const hiddenAcc = (data.accountNo || '').trim();
    const maskedAcc = hiddenAcc.length > 4 
      ? 'XXXXXX' + hiddenAcc.substring(hiddenAcc.length - 4)
      : hiddenAcc;
    ctx.fillText(`A/C: ${maskedAcc} • IFSC: ${(data.ifsc || '').trim().toUpperCase()}`, canvasWidth / 2, textStartY + 45);
  }

  // Amount & Note row (if available)
  let extraInfoY = textStartY + 100;
  if (data.amount) {
    ctx.font = '800 48px "Space Grotesk", sans-serif';
    ctx.fillStyle = theme.id === 'minimal' ? '#0f172a' : '#ffffff';
    
    const formattedAmount = parseFloat(data.amount);
    const amountText = !isNaN(formattedAmount) 
      ? `₹${formattedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
      : `₹${data.amount}`;
    
    ctx.fillText(amountText, canvasWidth / 2, extraInfoY);
    extraInfoY += 50;
  }

  if (data.note) {
    ctx.font = 'italic 22px "Inter", sans-serif';
    ctx.fillStyle = theme.id === 'minimal' ? '#64748b' : 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(`"${data.note}"`, canvasWidth / 2, extraInfoY);
  }

  // 8. Draw "by UPIpe" Branding at the very bottom
  ctx.fillStyle = theme.id === 'minimal' ? '#94a3b8' : 'rgba(255, 255, 255, 0.5)';
  ctx.font = '600 20px "Space Grotesk", "Inter", sans-serif';
  ctx.fillText('by UPIpe', canvasWidth / 2, canvasHeight - 60);

  // 9. Export as JPG & trigger instant download
  const jpegUrl = canvas.toDataURL('image/jpeg', 0.95);
  const downloadLink = document.createElement('a');
  
  // Create beautiful, user-friendly file name
  const sanitizedName = (data.payeeName || 'payment').replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const amtSuffix = data.amount ? `_${data.amount}` : '';
  downloadLink.download = `exactpay_${sanitizedName}${amtSuffix}.jpg`;
  
  downloadLink.href = jpegUrl;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
