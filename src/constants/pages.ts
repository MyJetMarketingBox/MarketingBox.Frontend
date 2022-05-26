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
  CAMPAIGN: "/campaigns/:id",
  GEO_EDIT: "/geo/edit/:id?",
  POSTBACK_LOGS: "/postback_logs",
  POSTBACK: "/postback",
  BRANDS: "/brands",
  BRAND: "/brands/:id",
  PAYOUTS: "/payouts",
  CONVERSIONS: "/conversions",
  MARKETING_TOOLS: "/marketing_tools",
  REDISTRIBUTION: "/redistribution",

  SIGN_IN: "/login",
  SIGN_UP: "/register",
  SIGN_OUT: "/logout",
};

Object.freeze(Page);
export default Page;
