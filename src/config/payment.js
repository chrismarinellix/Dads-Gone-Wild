// Payment Gateway Configuration
// To enable Stripe payments:
// 1. Sign up at https://stripe.com
// 2. Get your publishable key from the Stripe dashboard
// 3. Replace the placeholder below with your actual key
// 4. Set up webhook endpoint in Stripe dashboard pointing to your backend

const paymentConfig = {
  // Stripe Publishable Key (safe to expose in frontend)
  // Test key starts with: pk_test_
  // Live key starts with: pk_live_
  stripePublishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE',
  
  // Payment settings
  currency: 'AUD',
  country: 'AU',
  
  // Deposit percentage (50% deposit required)
  depositPercentage: 0.5,
  
  // Payment methods accepted
  paymentMethods: ['card', 'bank_transfer'],
  
  // Business details for bank transfer
  bankDetails: {
    accountName: 'Dads Gone Wild',
    bsb: 'XXX-XXX', // Replace with actual BSB
    accountNumber: 'XXXXXXXX', // Replace with actual account
    reference: 'Name + Adventure'
  }
};

// Stripe integration functions
export const initializeStripe = async () => {
  // This would load Stripe.js
  // const stripe = await loadStripe(paymentConfig.stripePublishableKey);
  // return stripe;
};

export const createCheckoutSession = async (packageDetails, groupSize) => {
  // This would create a Stripe Checkout session
  // In production, this would call your backend API
  const totalAmount = packageDetails.price * groupSize;
  const depositAmount = totalAmount * paymentConfig.depositPercentage;
  
  console.log('Payment details:', {
    package: packageDetails.name,
    groupSize,
    totalAmount,
    depositAmount,
    currency: paymentConfig.currency
  });
  
  // For now, return payment instructions
  return {
    method: 'bank_transfer',
    details: paymentConfig.bankDetails,
    amount: depositAmount
  };
};

export default paymentConfig;