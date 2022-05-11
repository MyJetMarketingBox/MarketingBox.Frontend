import { AffiliatesState } from "./../store/affiliates/actionTypes";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import authHeader from "./jwt-token-access/auth-token-header";
import config from "../config";

import { toast, ToastOptions } from "react-toastify";
import Page from "../constants/pages";
import { useSelector } from "react-redux";
import { configureStore } from "src/store";
import { changelayoutMode } from "src/store/actions";

// interface
interface RetryStackType {
  [key: string]: number;
}

const TIMEOUT_ERROR = "timeout";
const optionToast: ToastOptions = {
  //@ts-ignore
  theme: localStorage.getItem("layoutTheme") || "light",
};

//apply base url for axios
const API_URL = config.traffme.affiliateUrlApi;
const axiosApi = axios.create({
  baseURL: API_URL,
});
// set defaults
axiosApi.defaults.headers.common["accept"] = "text/plain";
axiosApi.defaults.timeoutErrorMessage = TIMEOUT_ERROR;
axiosApi.defaults.timeout = 20000;

let RETRY_ERROR_STACK: RetryStackType = {};
const addRecconectAttempt = (url: string) => {
  let obj: RetryStackType = { ...RETRY_ERROR_STACK };
  const keys = Object.keys(obj);
  const isSet = keys.includes(url);
  if (!isSet) {
    obj[url] = 1;
  } else {
    obj[url] = obj[url] + 1;
  }
  RETRY_ERROR_STACK = obj;
};
const removeRecconnectAttemp = (url: string) => {
  let obj: RetryStackType = { ...RETRY_ERROR_STACK };
  const keys = Object.keys(obj);
  const isSet = keys.includes(url);
  if (isSet) {
    delete obj[url];
    RETRY_ERROR_STACK = obj;
  }
};

export const injectInterceptor = (store: any) => {
  const { dispatch } = store;
  // interceptor
  axiosApi.interceptors.response.use(
    function (response: AxiosResponse) {
      removeRecconnectAttemp(response.config.url || "");
      console.log(RETRY_ERROR_STACK);
      if (response.config.notification) {
        toast.success(response.config.notification, optionToast);
      }
      return response;
    },

    // IF ERROR
    function (error: AxiosError) {
      //
      const requestUrl: string = error.config.url || "";
      const originalRequest: AxiosRequestConfig = error.config;
      //
      const isTimeoutError = error.message === TIMEOUT_ERROR;
      const isClientRequest = !!error.config.isClientRequest;

      const showReconnectNotify = () => {
        const toastId = "reconnect-toast";
        const retries = Object.values(RETRY_ERROR_STACK);
        const isRecconectModal = retries.some(count => count >= 3);
        if (isRecconectModal && !toast.isActive(toastId)) {
          toast.promise(
            reconect,
            { pending: "Reconnecting ... " },
            { toastId }
          );
        }
      };

      const reconect = () => {
        addRecconectAttempt(requestUrl);
        return new Promise((resolve, reject) => {
          resolve(axiosApi(originalRequest));
        });
      };

      console.log("== response error ===");
      console.log("isClient ", error.config.isClientRequest);
      console.dir("isTimeout ", isTimeoutError);
      console.log("=== log end ===");

      // if timeout error & is client request
      if (isTimeoutError && isClientRequest) {
        toast.error("Timeout connection error", optionToast);
      }

      // if timeout error & is not client request
      if (isTimeoutError && !isClientRequest) {
        showReconnectNotify();
        console.log(RETRY_ERROR_STACK);
        return reconect();
      }

      // if error without status, has not timeout & don't need reconnect
      if (!error.response?.status && !isTimeoutError && isClientRequest) {
        toast.error(
          error.response?.data?.error?.message || error.message,
          optionToast
        );
      }

      // repeat request
      // 1. get url api
      // 2. add to error stack
      // 3. if count > 3 show modal
      // 4. return promise with repeat axios

      // if response has status

      if (error.response?.status) {
        console.log(`status ${error.response?.status}`);
        switch (error.response?.status) {
          case 401:
          case 403:
            optionToast.onClose = () => location.replace(Page.SIGN_OUT);
            break;

          case 500:
            console.log("status 500 handler");
            console.log(requestUrl);

            if (!isClientRequest) {
              showReconnectNotify();
              console.log(RETRY_ERROR_STACK);
              return reconect();
            }
            // SHOW RELOAD MODAL
            break;

          default:
            break;
        }
      }

      return Promise.reject(error);
    }
  );
};

export async function get(url: string, config = {}, isClientRequest = false) {
  axiosApi.defaults.headers.common = authHeader();
  return await axiosApi
    .get(url, { ...config, isClientRequest })
    .then(response => response.data);
}

export async function post(
  url: string,
  data: any,
  config = {},
  isClientRequest = true
) {
  axiosApi.defaults.headers.common = authHeader();
  return axiosApi
    .post(
      url,
      { ...data },
      { ...config, errorAlert: "post error", isClientRequest }
    )
    .then(response => response.data);
}

export async function put(
  url: string,
  data: any,
  config = {},
  isClientRequest = true
) {
  return axiosApi
    .put(url, { ...data }, { ...config, isClientRequest })
    .then(response => response.data);
}

export async function del(url: string, config = {}, isClientRequest = true) {
  return await axiosApi
    .delete(url, { ...config, isClientRequest })
    .then(response => response.data);
}
