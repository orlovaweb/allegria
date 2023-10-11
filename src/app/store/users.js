import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
// import getRandomInt from "../utils/getRandomInt";
// import history from "../utils/history";

const initialState = localStorageService.getAccessToken() ? {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: localStorageService.getUserId() },
  isLoggedIn: true,
  dataLoaded: false
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestField: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userUploaded: (state, action) => {
      state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    removedError: (state) => {
      state.error = null;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceved, usersRequestField, authRequestSuccess, authRequestFailed, userCreated, userLoggedOut, userUploaded, authRequested, removedError } = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUploadRequested = createAction("users/userUploadRequested");
const userUploadFailed = createAction("users/userUploadFailed");
const removedErrorRequested = createAction("users/removedErrorRequested");
const removedErrorFailed = createAction("users/removedErrorFailed");

export const login = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    dispatch(authRequestSuccess({ userId: data.localId }));
    localStorageService.setTokens(data);
    console.log(redirect);
    // history.push(redirect);
  } catch (error) {
    const { code, message } = error.response.data.error;
    console.log(code, message);
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  try {
    dispatch(authRequested());
    const data = await authService.register({ email, password });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    dispatch(createUser({
      _id: data.localId,
      email,
      ...rest
    }));
  } catch (error) {
    const { code, message } = error.response.data.error;
    console.log(code, message);
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  // history.push("/");
};

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      // history.push("/goods");
    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}
export function uploadUser(payload) {
  return async function (dispatch) {
    dispatch(userUploadRequested());
    try {
      const { content } = await userService.upload(payload);
      dispatch(userUploaded(content));
      // history.push(`/users/${content._id}`);
    } catch (error) {
      dispatch(userUploadFailed(error.message));
    }
  };
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestField(error.message));
  }
};
export const removeError = () => async (dispatch) => {
  dispatch(removedErrorRequested());
  try {
    // const { content } = await userService.get();
    dispatch(removedError());
  } catch (error) {
    dispatch(removedErrorFailed(error.message));
  }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserData = () => (state) => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === state.users.auth.userId);
  }
  return null;
};
export const getUserById = (userId) => state => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === userId);
  }
};
export const getIsLoggedIn = () => state => state.users.isLoggedIn;
export const getDataStatus = () => state => state.users.dataLoaded;
export const getCurrentUserId = () => state => state.users.auth.userId;
export const getAuthError = () => state => state.users.error;
export default usersReducer;
