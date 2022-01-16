import axios from "axios"
import authHeader from "./jwt-token-access/auth-token-header"

//pass new generated access token here
//const token = accessToken

//apply base url for axios
const API_URL = "https://affiliate-api.traffme.com/"

const axiosApi = axios.create({
  baseURL: API_URL,
})

//console.log(authHeader());

//axiosApi.defaults.headers.common["Authorization"] = token
//axiosApi.defaults.headers.common = authHeader();
axiosApi.defaults.headers.common["accept"] = 'text/plain'

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url : string, config = {}) {
  axiosApi.defaults.headers.common = authHeader();
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url : string, data : any, config = {}) {
  axiosApi.defaults.headers.common = authHeader();
  return axiosApi
    .post(url, { ...data }, { ...config })
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
