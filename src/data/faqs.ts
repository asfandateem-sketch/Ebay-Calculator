export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const generalFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How accurate is the ProfitEbay eBay Fee Calculator?',
    answer: 'ProfitEbay is built on official eBay 2026 fee schedules for each supported international marketplace (US, UK, AU, CA, DE, FR, IT, ES). It calculates exact Final Value Fees including category tier breakpoints, buyer sales taxes / VAT on payment processing basis, store subscription discounts, Top Rated Plus 10% rebates, below-standard penalties, and promoted listings.',
  },
  {
    id: 'faq-2',
    question: 'Why are eBay fees calculated on shipping and sales tax?',
    answer: 'Under eBay Managed Payments, credit card networks charge processing fees on the total gross processed amount (item + shipping + sales tax). To simplify billing and prevent sellers from circumvention by lowering item prices and inflating shipping, eBay assesses Final Value Fees against the total buyer payment.',
  },
  {
    id: 'faq-3',
    question: 'What is the Top Rated Plus fee discount on eBay?',
    answer: 'Sellers who achieve Top Rated Seller status and qualify their listings for Top Rated Plus (offering same-day or 1-business-day handling and 30-day free returns) receive a 10% discount on the Final Value Fee percentage portion of their sale.',
  },
  {
    id: 'faq-4',
    question: 'How do eBay Store subscriptions lower seller fees?',
    answer: 'Subscribing to a Basic, Premium, Anchor, or Enterprise Store reduces the final value fee in several popular high-volume categories (such as Consumer Electronics, Cameras, and Computers from 13.25% down to 9.0%) and provides thousands of zero-insertion-fee listing allotments every month.',
  },
  {
    id: 'faq-5',
    question: 'How does eBay UK 0% private seller fee work?',
    answer: 'eBay UK eliminated final value fees for private individual non-business sellers across most consumer categories. However, registered Business Sellers continue to pay standard category commercial rates (11.9% to 14.9% + £0.30 + VAT). You can toggle between private and business modes in ProfitEbay.',
  },
  {
    id: 'faq-6',
    question: 'What is the difference between Break-Even Price and Target Profit Price?',
    answer: 'Break-Even Price is the exact minimum selling price where your Net Profit is $0.00 after all costs and percentage-based fees. Target Profit Price calculates the exact listing price required to hit a specific dollar profit (e.g. $25) or margin percentage (e.g. 30%).',
  },
  {
    id: 'faq-7',
    question: 'How is the Promoted Listings Standard fee billed?',
    answer: 'Promoted Listings Standard is a pure pay-per-sale advertising model. You set a chosen ad rate percentage (e.g. 3%). eBay only charges this fee if a buyer clicks on your sponsored ad and completes a purchase within 30 days. It is calculated on the total sale price including shipping.',
  },
];
