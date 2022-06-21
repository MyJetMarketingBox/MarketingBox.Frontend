import parseJwt from "src/common/utils/parse";
import { LOCAL_STORAGE_TOKEN } from "./../constants/localStorageKeys";

export const getAuthUserInfo = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  if (!token) {
    return null;
  }
  return parseJwt(JSON.parse(token));
};
