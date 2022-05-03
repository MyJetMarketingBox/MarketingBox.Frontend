//const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtYXJrZXRpbmctYm94LWFmZmlsaWF0ZSIsInVzZXItbmFtZSI6IkdlbmVyYWxVc2VyIiwidGVuYW50LWlkIjoiZGVmYXVsdC10ZW5hbnQtaWQiLCJyb2xlIjoiQWRtaW4iLCJ1c2VyLWlkIjoiR2VuZXJhbE1hbmFnZXIiLCJuYmYiOjE2NDEyMTcyMjIsImV4cCI6MTY0MTM0NjgyMiwiaWF0IjoxNjQxMjE3MjIyfQ.T1Y7m2cHSjSf-nfRjoxtA4Lg7p2syhW6gqbwwuV1vBs"

import { LOCAL_STORAGE_AUTH_USER } from "../../constants/localStorageKeys";

const authUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

const token = authUser != null ? authUser.token : null;

const accessToken = token != null ? "Bearer " + token : "";
//console.log(accessToken);
export default accessToken;
