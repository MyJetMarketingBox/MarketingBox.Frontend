import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import {
  authHeader,
  registerHeader,
} from "./jwt-token-access/auth-token-header";
import config from "../config";
import { toast, ToastOptions } from "react-toastify";
import Page from "../constants/pages";

import {
  setErrorText,
  setReloadPopup,
  setRequestReconnect,
  stopRequestReconnect,
} from "../store/actions";
import { sleep } from "./useSleep";

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

/*
    add error to stack & update count
*/
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

/*
    remove error from stack
*/
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

  const isLongReconnectModal = () => {
    const retries = Object.values(RETRY_ERROR_STACK);
    return retries.some(count => count >= 3);
  };

  /*
      show reconnect modal
  */
  const showReconnectNotify = () => {
    if (isLongReconnectModal()) {
      dispatch(setRequestReconnect());
    }
  };
  /*
      hide reconnect modal
  */
  const hideReconnectNotify = () => {
    if (!isLongReconnectModal()) {
      dispatch(stopRequestReconnect());
    }
  };

  // interceptor
  axiosApi.interceptors.response.use(
    function (response: AxiosResponse) {
      removeRecconnectAttemp(response.config.url || "");
      hideReconnectNotify();

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

      const isClientRequest = !!error.config.isClientRequest;
      const isTimeoutError = error.message == TIMEOUT_ERROR;
      //

      const reconect = async () => {
        addRecconectAttempt(requestUrl);
        await sleep(5000);
        return new Promise((resolve, reject) => {
          resolve(axiosApi(originalRequest));
        });
      };

      console.log("== response error ===");
      console.log("isClient ", error.config.isClientRequest);
      console.log("isTimeout ", isTimeoutError);
      console.log("=== log end ===");

      // if timeout error & is client request
      if (isTimeoutError && isClientRequest) {
        toast.error("Timeout connection error", optionToast);
      }

      // if timeout error & is not client request
      if (isTimeoutError && !isClientRequest) {
        showReconnectNotify();
        return reconect();
      }

      // if error without status, has not timeout & don't need reconnect
      if (!error.response?.status && !isTimeoutError && isClientRequest) {
        toast.error(
          error.response?.data?.error?.message || error.message,
          optionToast
        );
      }

      if (!error.response?.status && !isTimeoutError && !isClientRequest) {
        dispatch(setErrorText(error.message));
        dispatch(setReloadPopup());
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
            location.replace(Page.SIGN_OUT);
            break;

          case 400:
            toast.error(
              error.response?.data?.error?.errorMessage || error.message,
              optionToast
            );
            break;

          case 500:
            if (!isClientRequest) {
              showReconnectNotify();
              console.log("recconect");
              console.log(RETRY_ERROR_STACK);
              return reconect();
            } else {
              dispatch(setErrorText(error.message));
              dispatch(setReloadPopup());
            }

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
  config: AxiosRequestConfig = {},
  isClientRequest = true,
  isAffApi = true
) {
  axiosApi.defaults.headers.common = isAffApi ? authHeader() : registerHeader();

  console.log(config);
  return axiosApi
    .post(
      url,
      { ...data },
      { ...config, errorAlert: "post error", isClientRequest }
    )
    .then(response => response.data);
}

export async function postFile(
  url: string,
  data: Blob,
  config: AxiosRequestConfig = {},
  isClientRequest = true,
  isAffApi = true
) {
  axiosApi.defaults.headers.common = isAffApi ? authHeader() : registerHeader();

  const formData = new FormData();

  formData.append("file", data);
  return axiosApi
    .post(url, formData, {
      ...config,
      errorAlert: "post error",
      isClientRequest,
    })
    .then(response => response.data);
}

export async function put(
  url: string,
  data: any,
  config = {},
  isClientRequest = true
) {
  axiosApi.defaults.headers.common = authHeader();

  return axiosApi
    .put(url, { ...data }, { ...config, isClientRequest })
    .then(response => {
      return response.data;
    });
}

export async function del(url: string, config = {}, isClientRequest = true) {
  return await axiosApi
    .delete(url, { ...config, isClientRequest })
    .then(response => response.data);
}
