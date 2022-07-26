const Page = {
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  AFFILIATES: "/Affiliates",
  AFFILIATE: "/Affiliates/:id",
  REPORTS: "/reports",
  REGISTRATIONS: "/registrations",
  REGISTERING: "/Registering",
  INTEGRATIONS: "/Integrations",
  INTEGRATION: "/Integrations/:id",
  CAMPAIGNS: "/campaigns",
  CAMPAIGN_TAB: "/campaigns/:tab",
  CAMPAIGN_DETAILS: "/campaigns/details",
  CAMPAIGN: "/campaigns/details/:id",
  GEO_ADD: "/geo/edit",
  GEO_EDIT: "/geo/edit/:id?",
  POSTBACK_LOGS: "/postback_logs",
  POSTBACKS: "/postbacks",
  BRANDS: "/brands",
  BRAND: "/brands/:id",
  PAYOUTS: "/payouts",
  CONVERSIONS: "/conversions",
  MARKETING_TOOLS: "/marketing_tools",
  REDISTRIBUTION: "/redistribution",
  REDISTRIBUTION_ADD: "/redistribution/add",
  REDISTRIBUTION_TAB: "/redistribution/:tab",
  REDISTRIBUTION_FILES_DETAIL: "/redistribution/files/:id",
  OFFERS: "/offers",
  OFFERS_DETAIL_TAB: "/offers/:id/:tab",
  OFFERS_DETAIL: "/offers/:id",
  RESET_PASSWORD: "/reset-password/:token",

  CONFIRM_EMAIL_STATUS: "/confirm-email/:status",
  CONFIRM_EMAIL: "/confirm-email",
  
  SIGN_IN: "/login",
  SIGN_UP: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  SIGN_OUT: "/logout",
  LOCK_SCREEN: "/lock-screen"
};

Object.freeze(Page);
export default Page;
