//const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtYXJrZXRpbmctYm94LWFmZmlsaWF0ZSIsInVzZXItbmFtZSI6IkdlbmVyYWxVc2VyIiwidGVuYW50LWlkIjoiZGVmYXVsdC10ZW5hbnQtaWQiLCJyb2xlIjoiQWRtaW4iLCJ1c2VyLWlkIjoiR2VuZXJhbE1hbmFnZXIiLCJuYmYiOjE2NDEyMTcyMjIsImV4cCI6MTY0MTM0NjgyMiwiaWF0IjoxNjQxMjE3MjIyfQ.T1Y7m2cHSjSf-nfRjoxtA4Lg7p2syhW6gqbwwuV1vBs"

import { LOCAL_STORAGE_TOKEN } from "../../constants/localStorageKeys";

const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN)) || null;
const accessToken = token != null ? "Bearer " + token : "";

export default accessToken;
