import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
const API_URL = "https://mb-affiliate-api.mnftx.biz/api"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token
axiosApi.defaults.headers.common["accept"] = 'text/plain'

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url : string, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url : string, data : any, config = {}) {
  // return axiosApi
  //   .post(url, { ...data }, { ...config })
  //   .then(response => response.data)
  let response;
  console.log(2);
  console.log(data);
  try {
    // response = await axios.post('https://mb-auth-api.mnftx.biz/api/auth/login', {
    //   "email": "testqaS1637833838306@mailinator.com",
    //   "password": "qwerty_123456"
    // });


    const config1 = {
      method: 'post',
      url: 'https://mb-auth-api.mnftx.biz/api/auth/login',
      headers: {
        'Content-Type': 'application/json-patch+json',
        'accept': 'text/plain'
      },
      data : {
          "email": "testqaS1637833838306@mailinator.com",
          "password": "qwerty_123456"
      }
    };


    // @ts-ignore
    // axios(config1)
    // .then(function (response) {
    //   console.log(JSON.stringify(response));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    const data1 = {
      "email": "testqaS1637833838306@mailinator.com",
      "password": "qwerty_123456"
    }


    response = await fetch('https://mb-auth-api.mnftx.biz/api/auth/login', {
        body: JSON.stringify(data1),
        method: 'post',
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json-patch+json'
        }
    });
    let res = await response.json();

    console.log(res)
  }catch (e) {
    console.log(e);
  }
  //console.log(response);
  // @ts-ignore
  //const datM = response.data;
  //console.log(datM);
  console.log(3);
  //debugger
  return {  };
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
