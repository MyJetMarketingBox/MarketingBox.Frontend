import axios, { AxiosError, AxiosResponse } from "axios";
import authHeader from "./jwt-token-access/auth-token-header";
import config from "../config";

import { Theme, toast, ToastOptions } from "react-toastify";
import Page from "../constants/pages";

const TIMEOUT_ERROR = 'timeout';
//pass new generated access token here
//const token = accessToken

const optionToast: ToastOptions = {
  //@ts-ignore
  theme: localStorage.getItem("layoutTheme") || "light",
};

//apply base url for axios
const API_URL = config.traffme.affiliateUrlApi;

const axiosApi = axios.create({
  baseURL: API_URL,
});
axiosApi.defaults.headers.common["accept"] = "text/plain";
axiosApi.defaults.timeout = 10000;
axiosApi.defaults.timeoutErrorMessage = TIMEOUT_ERROR;

axiosApi.interceptors.response.use(
  function (response: AxiosResponse) {
    // @ts-ignore
    if (response.config.notification) {
      // @ts-ignore
      toast.success(response.config.notification, optionToast);
    }
    return response;
  },

  function (error: AxiosError) {
    const requestUrl = error.config.url;
    const originalRequest = error.config;
    console.log("req error")
    console.dir(error.message === TIMEOUT_ERROR);
    switch (error.response?.status) {
      case 401:
      case 403: {
        optionToast.onClose = () => location.replace(Page.SIGN_OUT);
        break;
      }

      case 500: {
        // repeat request

        break;
      }

      default:
        break;
    }
    toast.error(error.response?.data.error.errorMessage, optionToast);
    return Promise.reject(error);
  }
);

export async function get(url: string, config = {}) {
  axiosApi.defaults.headers.common = authHeader();
  // @ts-ignore
  return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url: string, data: any, config = {}) {
  axiosApi.defaults.headers.common = authHeader();
  return (
    axiosApi
      // @ts-ignore
      .post(url, { ...data }, { ...config, errorAlert: "post error" })
      .then(response => response.data)
  );
}

export async function put(url: string, data: any, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url: string, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
