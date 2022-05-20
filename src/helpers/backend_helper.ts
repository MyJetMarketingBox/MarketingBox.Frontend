import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("userAuth");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
const postRegister = (data: any) => post(url.POST_REGISTER, data, {}, true, false);

// Login Method
const postLogin = (data: any) => post(url.POST_FAKE_LOGIN, data);

// postForgetPwd
const postFakeForgetPwd = (data: any) =>
  post(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
const postJwtProfile = (data: any) => post(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = (data: any) => post(url.POST_EDIT_PROFILE, data);

// Register Method
const postJwtRegister = (url: string, data: any) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch(err => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postJwtLogin = (data: any) => post(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
const postJwtForgetPwd = (data: any) =>
  post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// get affiliates
export const getAffiliates = (nextUrl: any, filter: object) =>
  get(nextUrl || url.AFFILIATES, { params: filter });

export const getAffiliateProfile = (id: number) =>
  get(`${url.AFFILIATES}/${id}`);

export const addNewAffiliate = (affiliate: any) =>
  post(url.AFFILIATES, affiliate);

export const deleteAffiliate = (id: number) => del(`${url.AFFILIATES}/${id}`);

export const updateAffiliate = (affiliate: object, id: number) =>
  put(`${url.AFFILIATES}/${id}`, affiliate, { notification: "Update success!" });

// get registrations
export const getRegistrations = (nextUrl: any, filter: object) =>
  get(nextUrl || url.REGISTRATIONS, { params: filter });

export const getStatusLog = (filter: object) => get(url.REGISTRATIONS_STATUS_LOG, {params: filter});


export const updateRegStatus = (id: number, request: object) => put(`${url.REGISTRATIONS}/${id}/update-status`, request)

// get postback logs
export const getPostbackLogs = (nextUrl: any, filter: object) =>
  get(nextUrl || url.POSTBACKLOGS, { params: filter });

/** POSTBACK **/
export const getPostback = () => get(url.POSTBACK);

export const addPostback = (postback: any) => post(url.POSTBACK, postback);

export const updatePostback = (postback: object) => put(url.POSTBACK, postback);

export const delPostback = () => del(`${url.POSTBACK}`);
/** END POSTBACK **/

/** AFF PAYOUTS **/
export const getAffPayouts = (nextUrl: any, filter: object) =>
  get(nextUrl || url.AFF_PAYOUTS, { params: filter });

/*export const getAffPayouts = (nextUrl: any, filter: object) =>
  post(nextUrl || url.AFF_PAYOUTS_SEARCH, filter);*/

export const addAffPayouts = (affPayouts: any) =>
  post(url.AFF_PAYOUTS, affPayouts);

export const delAffPayouts = (id: number) => del(`${url.AFF_PAYOUTS}/${id}`);
/** END AFF PAYOUTS **/

/** GEO **/
export const getGeo = (nextUrl: any, filter: object) =>
  get(nextUrl || url.GEO, { params: filter });

/*export const getGeo = (nextUrl: any, filter: object) =>
  post(nextUrl || url.GEO_SEARCH, filter);*/

/** END GEO **/

// get reports
export const getReports = (nextUrl: any, filter: any) =>
  get(nextUrl || url.GET_REPORTS, { params: filter });

/** BRANDS **/
export const getBrands = (nextUrl: any, filter: object) =>
  get(nextUrl || url.BRANDS, { params: filter });

export const addBrand = (brand: any) => post(url.BRANDS, brand);

export const updateBrand = (brand: object, id: number) =>
  put(`${url.BRANDS}/${id}`, brand, { notification: "Update success!" });

export const delBrand = (id: number) => del(`${url.BRANDS}/${id}`);

export const getBrand = (id: number) => get(`${url.BRANDS}/${id}`);

/** END BRANDS **/

/** BRAND PAYOUTS **/
export const getBrandPayouts = (nextUrl: any, filter: object) =>
  get(nextUrl || url.BRAND_PAYOUTS, { params: filter });

/*export const getBrandPayouts = (nextUrl: any, filter: object) =>
  post(nextUrl || url.BRAND_PAYOUTS_SEARCH, filter);*/

export const addBrandPayout = (brandPayout: any) =>
  post(url.BRAND_PAYOUTS, brandPayout);
/** END PAYOUTS **/

// get countries
export const getCountries = (nextUrl: any, filter: object) =>
  get(nextUrl || url.COUNTRIES, { params: filter });

/** INTEGRATIONS **/
export const getIntegrations = (nextUrl: any, filter: object) =>
  get(nextUrl || url.INTEGRATIONS, { params: filter });

export const getIntegration = (id: number) => get(`${url.INTEGRATIONS}/${id}`);

export const addIntegration = (integration: any) =>
  post(url.INTEGRATIONS, integration);

export const deleteIntegration = (id: number) =>
  del(`${url.INTEGRATIONS}/${id}`);

export const updateIntegration = (integration: object, id: number) =>
  put(`${url.INTEGRATIONS}/${id}`, integration);

/** END INTEGRATIONS **/

// campaigns
export const getCampaignsApi = (nextUrl: any, filter: object) =>
  get(nextUrl || url.CAMPAIGNS, { params: filter });

export const addCampaignApi = (campaign: any) => post(url.CAMPAIGNS, campaign);

export const deleteCampaignApi = (id: number) => del(`${url.CAMPAIGNS}/${id}`);

export const updateCampaignApi = (campaign: object, id: number) =>
  put(`${url.CAMPAIGNS}/${id}`, campaign);

// Languages
export const getLanguagesList = (nextUrl: any, filter: object) =>
  get(nextUrl || url.LANGUAGES, { params: filter });

export const getRedistribution = (nextUrl: any, filter: object) => get(nextUrl || url.REDISTRIBUTION, { params: filter })


export {
  getLoggedInUser,
  isUserAuthenticated,
  postRegister,
  postLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
};
