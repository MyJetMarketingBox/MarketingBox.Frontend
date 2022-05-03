import { LOCAL_STORAGE_AUTH_USER } from "../../constants/localStorageKeys";

export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER))

  if (obj && obj.token) {
    return { Authorization: "Bearer "+obj.token }
  } else {
    return null;
  }
}
