import axios from "axios"
import authHeader from "./jwt-token-access/auth-token-header"
import config from "../config";

import { toast } from "react-toastify";
import Page from "../constants/pages";

//pass new generated access token here
//const token = accessToken

//apply base url for axios
const API_URL = config.traffme.affiliateUrlApi

const axiosApi = axios.create({
  baseURL: API_URL
})

// const dispatch = useDispatch();

//console.log(authHeader());

//axiosApi.defaults.headers.common["Authorization"] = token
//axiosApi.defaults.headers.common = authHeader();
axiosApi.defaults.headers.common["accept"] = 'text/plain'

axiosApi.interceptors.response.use(
  response => {
    // @ts-ignore
    if (response.config.notification) {
      // @ts-ignore
      toast.success(response.config.notification, { theme: localStorage.getItem('layoutTheme') });
    }
    return response;
  },
  error => {
    const optionToast = {
      theme: localStorage.getItem('layoutTheme')
    };
    // @ts-ignore
    if(error.response.status === 401) optionToast.onClose = () => location.replace(Page.SIGN_OUT);
    // @ts-ignore
    toast.error(error.response.data.error.errorMessage, optionToast);
    return Promise.reject(error);
  }
)

export async function get(url : string, config = {}) {
  axiosApi.defaults.headers.common = authHeader();
  // @ts-ignore
  return await axiosApi.get<T>(url, { ...config }).then(response => response.data)
}

export async function post(url : string, data : any, config = {}) {
  axiosApi.defaults.headers.common = authHeader();
  return axiosApi
    // @ts-ignore
    .post(url, { ...data }, { ...config, errorAlert: 'post error' })
    .then(response => response.data)
}

export async function put(url : string, data : any, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url : string, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
