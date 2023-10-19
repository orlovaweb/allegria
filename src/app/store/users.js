import { createAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
import { generateChangePassError } from "../utils/generateChangePassError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken() ? {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: localStorageService.getUserId() },
  isLoggedIn: true,
  dataLoaded: false,
  emailResetedPassword: null,
  favorite: [],
  cart: []
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false,
  emailResetedPassword: null,
  favorite: [],
  cart: []
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    userRequestField: (state, action) => {
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
      state.entities = action.payload;
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
    },
    resetPasswordSuccess: (state, action) => {
      state.emailResetedPassword = action.payload;
    },
    favoriteAdded: (state, action) => {
      state.entities.favorite = action.payload.favorite;
    },
    favoriteDeleted: (state, action) => {
      state.entities.favorite = action.payload.favorite;
    },
    unauthorizedFavoriteUploaded: (state, action) => {
      state.favorite = action.payload;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { userRequested, userReceved, userRequestField, authRequestSuccess, authRequestFailed, userCreated, userLoggedOut, userUploaded, authRequested, removedError, resetPasswordSuccess, favoriteAdded, favoriteDeleted, unauthorizedFavoriteUploaded } = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUploadRequested = createAction("users/userUploadRequested");
const userUploadFailed = createAction("users/userUploadFailed");
const removedErrorRequested = createAction("users/removedErrorRequested");
const removedErrorFailed = createAction("users/removedErrorFailed");
const userUnauthorizedFavoriteRequested = createAction("users/userUnauthorizedFavoriteRequested");
const userUnauthorizedFavoriteFailed = createAction("users/userUnauthorizedFavoriteFailed");

export const login = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    dispatch(authRequestSuccess({ userId: data.localId }));
    localStorageService.setTokens(data);
    console.log(redirect);
    toast.success("Вы успешно вошли в систему!", {
      autoClose: 2000,
      hideProgressBar: true,
      theme: "dark",
    });
    // history.push(redirect);
    // history.push("/account");
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested());
  try {
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
export const changePassword = (password) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.changePassword({ password });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    toast.success("Пароль был успешно изменен", {
      autoClose: 2000,
      hideProgressBar: true,
      theme: "dark",
    });

  } catch (error) {
    const { code, message } = error.response.data.error;
    console.log(code, message);
    if (code === 400) {
      const errorMessage = generateChangePassError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};
export const resetPassword = (email) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.resetPassword({ email });
    dispatch(resetPasswordSuccess(data.email));
  } catch (error) {
    const { code, message } = error.response.data.error;
    console.log(code, message);
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      history.push("/account");
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
      history.push("/account/adress");
      toast.success("Данные были успешно обновлены", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    } catch (error) {
      dispatch(userUploadFailed(error.message));
    }
  };
}

export function addFavorite(payload) {
  return async function (dispatch, getState) {
    dispatch(userUploadRequested());
    try {
      const newfavoriteArray = getState().users.entities.favorite ? [...getState().users.entities.favorite, payload] : [payload];
      const user = { ...getState().users.entities, favorite: newfavoriteArray };
      const { content } = await userService.upload(user);
      dispatch(favoriteAdded(content));
    } catch (error) {
      dispatch(userUploadFailed(error.message));
    }
  };
}
export function loadUnauthorizedFavorite() {
  return async function (dispatch) {
    dispatch(userUnauthorizedFavoriteRequested());
    try {
      const favoriteArray = localStorage.favorite ? JSON.parse(localStorage.favorite) : [];
      dispatch(unauthorizedFavoriteUploaded(favoriteArray));
    } catch (error) {
      dispatch(userUnauthorizedFavoriteFailed(error.message));
    }
  };
}
export function addUnauthorizedFavorite(payload) {
  return async function (dispatch, getState) {
    dispatch(userUnauthorizedFavoriteRequested());
    try {
      const newFavoriteArray = getState().users.favorite ? [...getState().users.favorite, payload] : [payload];
      localStorage.favorite = JSON.stringify(newFavoriteArray);
      dispatch(unauthorizedFavoriteUploaded(newFavoriteArray));
    } catch (error) {
      dispatch(userUnauthorizedFavoriteFailed(error.message));
    }
  };
}
export function removeFavorite(payload) {
  return async function (dispatch, getState) {
    dispatch(userUploadRequested());
    try {
      const newfavoriteArray = getState().users.entities.favorite.filter(f => f !== payload);
      const user = { ...getState().users.entities, favorite: newfavoriteArray };
      const { content } = await userService.upload(user);
      dispatch(favoriteDeleted(content));
    } catch (error) {
      dispatch(userUploadFailed(error.message));
    }
  };
}
export function removeUnauthorizedFavorite(payload) {
  return async function (dispatch, getState) {
    dispatch(userUnauthorizedFavoriteRequested());
    try {
      const newFavoriteArray = getState().users.favorite.filter(f => f !== payload);
      localStorage.favorite = JSON.stringify(newFavoriteArray);
      dispatch(unauthorizedFavoriteUploaded(newFavoriteArray));
    } catch (error) {
      dispatch(userUnauthorizedFavoriteFailed(error.message));
    }
  };
}
export const loadUser = () => async (dispatch, getState) => {
  dispatch(userRequested());
  try {
    const { content } = await userService.getById(getState().users.auth.userId);
    dispatch(userReceved(content));
  } catch (error) {
    dispatch(userRequestField(error.message));
  }
};
// export const loadUsersList = () => async (dispatch) => {
//   dispatch(usersRequested());
//   try {
//     const { content } = await userService.get();
//     dispatch(usersReceved(content));
//   } catch (error) {
//     dispatch(usersRequestField(error.message));
//   }
// };
export const removeError = () => async (dispatch) => {
  dispatch(removedErrorRequested());
  try {
    dispatch(removedError());
  } catch (error) {
    dispatch(removedErrorFailed(error.message));
  }
};

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserData = () => (state) => {
  if (state.users.entities) {
    return state.users.entities;
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
export const getEmailResetedPassword = () => state => state.users.emailResetedPassword;
export const getFavorite = () => state => state.users.entities?.favorite;
export const getUnauthorizedFavorite = () => state => state.users.favorite;


export default usersReducer;
