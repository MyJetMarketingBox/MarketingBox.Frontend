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
    "affiliate-id": 165,
    "api-key": "6a5b15346e9f4c39bf14087f7adfac4c",
  };
}
