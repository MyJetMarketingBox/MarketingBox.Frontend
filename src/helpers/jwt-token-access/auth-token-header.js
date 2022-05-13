import { LOCAL_STORAGE_AUTH_USER } from "../../constants/localStorageKeys";

export function authHeader (){
  const obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER))

  if (obj && obj.token) {
    return { Authorization: "Bearer "+obj.token }
  } else {
    return null;
  }
}


export function registerHeader() {
  return {
    'affiliate-id': 165,
    'api-key': '6a5b15346e9f4c39bf14087f7adfac4c',
  }
}