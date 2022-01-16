import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("userAuth")
  console.log(user);
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

// postSocialLogin
export const postSocialLogin = (data : any) => post(url.SOCIAL_LOGIN, data)

// get Products
export const getProducts = () => get(url.GET_PRODUCTS)

// get Product detail
export const getProductDetail = (id : number) =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = (event : any) => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = (event : any) => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = (event : any) =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = (message : any) => post(url.ADD_MESSAGE, message)

// get orders
export const getOrders = () => get(url.GET_ORDERS)

// add order
export const addNewOrder = (order : any) => post(url.ADD_NEW_ORDER, order)

// update order
export const updateOrder = (order  :any) => put(url.UPDATE_ORDER, order)

// delete order
export const deleteOrder = (order : any) =>
  del(url.DELETE_ORDER, { headers: { order } })

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// add CUSTOMER
export const addNewCustomer = (customer  : any) => post(url.ADD_NEW_CUSTOMER, customer)

// update CUSTOMER
export const updateCustomer = (customer  : any) => put(url.UPDATE_CUSTOMER, customer)

// delete CUSTOMER
export const deleteCustomer = (customer  : any) =>
  del(url.DELETE_CUSTOMER, { headers: { customer } })

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = (id : number) =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = (id : number) =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

// get contacts
export const getUsers = () => get(url.GET_USERS)

// add user
export const addNewUser = (user : any) => post(url.ADD_NEW_USER, user)

// update user
export const updateUser = (user : any) => put(url.UPDATE_USER, user)

// delete user
export const deleteUser = (user : any) => del(url.DELETE_USER, { headers: { user } })

/** PROJECT */
// // add user
// export const addNewProject = (project  :any) => post(url.ADD_NEW_PROJECT, project)
//
// // update user
// export const updateProject = (project  :any) => put(url.UPDATE_PROJECT, project)
//
// // delete user
// export const deleteProject = (project  :any) =>
//   del(url.DELETE_PROJECT, { headers: { project } })

export const getUserProfile = () => get(url.GET_USER_PROFILE)

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