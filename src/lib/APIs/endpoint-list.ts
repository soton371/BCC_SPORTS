export const API_ENDPOINTS = {
  LOGIN: 'auth/agent-b2c/login',
  TWO_FA_LOGIN: '/auth/agent-b2c/login/2fa',
  REGISTER: 'auth/agent-b2c/register',
  REGISTER_COMPLETE: 'auth/agent-b2c/register/complete',

  RESET_PASSWORD: '/auth/b2c/forget-password',
  SEND_OTP: '/public/send-email-otp',
  MATCH_OTP: '/public/match-email-otp',

  PROFILE: 'b2c/profile',
  CHANGE_PASSWORD: 'b2c/profile/change-password',
  LOGOUT: 'logout',

  // SELECT____________
  AIRPORT_SEARCH: 'public/common/airport',
  HOTEL_LIST_SEARCH: 'public/common/location-hotel',

  // SITE_CONFIG
  SITE_CONFIG_HOME: 'agent-b2c/config/home',
  ABOUT_US: 'agent-b2c/config/about-us',
  CONTACT_US: 'agent-b2c/config/contact-us',
  PRIVACY_POLICY: 'agent-b2c/config/privacy-policy',
  TERMS_AND_CONDITION: 'agent-b2c/config/terms-and-conditions',
  PAYMENT_METHOD: 'agent-b2c/config/accounts',

  //DEPOSIT
  DEPOSIT: 'agent-b2c/payments/deposit',

  //TRANSACTION
  TRANSACTION: 'agent-b2c/payments/ledger',

  //INVOICE
  INVOICE: 'agent-b2c/payments/invoice',

  //SUPPORT
  SUPPORT: 'agent-b2c/support-ticket',
};
