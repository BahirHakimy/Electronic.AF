import axios from "axios";

const TokenKey = "AUTH_TOKEN";

function getTokens() {
  const tokens = JSON.parse(localStorage.getItem(TokenKey));
  if (tokens && tokens?.access)
    return { access: tokens.access, refresh: tokens.refresh };
  return null;
}

function setTokens(data) {
  localStorage.setItem(TokenKey, JSON.stringify(data));
}
axios.defaults.baseURL = process.env.REACT_APP_baseURL;

const getHeaders = () => {
  const token = getTokens();
  const res = token
    ? {
        Authorization: "Bearer " + token.access,
        "Content-Type": "application/json",
        accept: "application/json",
      }
    : {
        "Content-Type": "application/json",
        accept: "application/json",
      };
  return res;
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_baseURL,
  timeout: 60000,
  headers: getHeaders(),
});

let retryCount = 0;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      error?.response?.statusText === "Unauthorized"
    ) {
      const { refresh: refresh_token } = getTokens();
      retryCount++;
      if (retryCount < 3) {
        return axiosInstance
          .post("auth/token/refresh/", { refresh: refresh_token })
          .then((response) => {
            setTokens(response.data);
            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + response.data.access;
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.access;

            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else {
        return Promise.reject({
          response: {
            message: "Authorization tokens has expired please reauthenticate",
          },
        });
      }
    }
    return Promise.reject(error);
  }
);

export {
  axiosInstance as axios,
  getTokens,
  setTokens,
  axios as baseAxios,
  TokenKey,
};
