import { LOCAL_STORAGE_TOKEN } from "../../constants/localStorageKeys";

export function authHeader() {
  const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN));

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return null;
  }
}

export function registerHeader() {
  return {
    "affiliate-id": process.env.REACT_APP_AFF_ID,
    "api-key": process.env.REACT_APP_API_KEY,
  };
}
