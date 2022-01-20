import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("userAuth")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = (data : any) => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postLogin = (data : any) => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = (data : any) => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = (data : any) => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = (data : any) => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url : string, data : any) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = (data : any) => post(url.POST_FAKE_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = (data : any) => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)


// get affiliates
export const getAffiliates = (data: any) => get(data || url.GET_AFFILIATES)

export const getAffiliateProfile = (id : number) =>
  get(`${url.GET_AFFILIATES}/${id}`, { params: { id } })

// get reports
export const getReports = (filter: any) => get(`${url.GET_REPORTS}`,  { params: filter } )


export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile
}
