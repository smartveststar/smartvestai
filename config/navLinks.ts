import { Home, WalletIcon, Mail, Users, User, CreditCard, BanknoteArrowDown, BanknoteArrowUp, UploadIcon   } from 'lucide-react';

export const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Invest', href: '/dashboard/invest', icon: WalletIcon  },
  { name: 'Deposit', href: '/dashboard/add-money', icon: BanknoteArrowUp },
  { name: 'Withdraw', href: '/dashboard/withdraw', icon: BanknoteArrowDown  },
  { name: 'Upload KYC', href: '/dashboard/kyc', icon: UploadIcon },
  { name: 'Referral System', href: '/dashboard/referrals', icon: Users },
  { name: 'Transactions', href: '/dashboard/transactions', icon: CreditCard },
  { name: 'My Portfolio', href: '/dashboard/portfolio', icon: User },
  { name: 'Support', href: '/dashboard/support', icon: Mail },
];