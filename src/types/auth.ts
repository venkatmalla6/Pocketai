export interface User {
  phoneNumber: undefined;
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
}

export interface UserProfile {
  email: string;
  role: 'Free' | 'Normal' | 'Gold' | 'Platinum';
  plan_end_time: string;
  creation_time: string;
  fcm_token?: string;
}

export interface PremiumPlan {
  id: 'Normal' | 'Gold' | 'Platinum';
  name: string;
  normalPrice: number;
  offerPrice: number;
  features: string[];
  modelLimit?: number;
  responseSpeed: 'Medium' | 'Fast' | 'Fastest';
  support: boolean;
  testFeatures?: boolean;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  upgradeUserRole: (role: 'Free' | 'Normal' | 'Gold' | 'Platinum', planEndTime: string) => Promise<UserProfile>;
  checkPremiumStatus: () => boolean;
  isPremiumExpired: () => boolean;
}

export interface RazorpayOptions {
  description: string;
  image: string;
  currency: string;
  key: string;
  amount: number;
  name: string;
  order_id: string;
  prefill: {
    email: string;
    contact: string;
    name: string;
  };
  theme: {
    color: string;
  };
  notes?: {
    [key: string]: string;
  };
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PromoCode {
  code: string;
  discount: number; // percentage
  isValid: boolean;
}

export interface FCMTokens {
  [userId: string]: string;
}

export type AuthScreen = 
  | 'Login'
  | 'Register' 
  | 'EmailVerification'
  | 'ForgotPassword';
