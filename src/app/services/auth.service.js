import axios from "axios";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post(`accounts:signUp`, {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(
      `accounts:signInWithPassword`,
      {
        email,
        password,
        returnSecureToken: true
      });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken()
    });
    return data;
  },
  changePassword: async ({ password }) => {
    const { data } = await httpAuth.post(
      `accounts:update`,
      {
        idToken: localStorageService.getAccessToken(),
        password,
        returnSecureToken: true
      });
    return data;
  },
  resetPassword: async ({ email }) => {
    const { data } = await httpAuth.post(
      `accounts:sendOobCode`,
      {
        requestType: "PASSWORD_RESET",
        email
      });
    return data;
  },
  verifyEmail: async (idToken) => {
    const { data } = await httpAuth.post(
      `accounts:sendOobCode`,
      {
        requestType: "VERIFY_EMAIL",
        idToken
      });
    return data;
  },
  getIsVerified: async (idToken) => {
    const { data } = await httpAuth.post(
      `accounts:lookup`,
      {
        idToken
      });
    return data;
  }
};

export default authService;
