export type TabType = 'upi' | 'bank';

export interface PaymentData {
  upiId: string;
  payeeName: string;
  amount: string;
  note: string;
  accountNo?: string;
  ifsc?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface QRTheme {
  id: string;
  name: string;
  bgGradient: string;
  textColor: string;
  qrColor: string;
  primaryColor: string;
}
