//REGISTER
import config from "../config";

export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
//export const POST_FAKE_LOGIN = "/post-fake-login"
export const POST_FAKE_LOGIN = config.traffme.authUrlApi + "api/auth/login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//AFFILIATES
export const AFFILIATES = "api/affiliates";

//AFFILIATES PAYOUTS
export const AFF_PAYOUTS = "api/AffiliatePayouts";
export const AFF_PAYOUTS_SEARCH = "api/AffiliatePayouts/search";

//GEO
export const GEO = "api/Geo";
export const GEO_SEARCH = "api/Geo/search";

//REGISTRATIONS
export const REGISTRATIONS = "api/registrations/search"

//PostbackLogs
export const POSTBACKLOGS = "api/PostbackLogs";

//Postback
export const POSTBACK = "api/postback";

//REPORTS
export const GET_REPORTS = "api/reports";

//CAMPAIGNS
export const CAMPAIGNS = "api/campaigns";

//BRANDS
export const BRANDS = "api/brands";
export const BRAND_PAYOUTS = "api/BrandPayouts";
export const BRAND_PAYOUTS_SEARCH = "api/BrandPayouts/search";

export const COUNTRIES = "api/countries";

export const INTEGRATIONS = "api/integrations";

//LANGUAGES
export const LANGUAGES = "api/Languages";
