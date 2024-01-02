import { createAction, createSlice } from "@reduxjs/toolkit";
import { animateScroll as scroll } from "react-scroll";
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
  isVerified: true,
  isCreated: false,
  dataLoaded: false,
  emailResetedPassword: null,
  verifyEmailIsSentTo: null,
  wasShownVerify: false,
  favorite: [],
  cart: []
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  isVerified: true,
  isCreated: false,
  dataLoaded: false,
  emailResetedPassword: null,
  verifyEmailIsSentTo: null,
  wasShownVerify: false,
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
    userCreated: (state) => {
      state.isCreated = true;
    },
    userUploaded: (state, action) => {
      state.entities = {
        ...state.entities, ...action.payload
      };
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
    },
    userCreateRequested: (state) => {
      state.isCreated = false;
    },
    sendVerifyEmailRequested: (state) => {
      state.verifyEmailIsSentTo = null;
    },
    verifyEmailIsSent: (state, action) => {
      state.verifyEmailIsSentTo = action.payload;
    },
    verifyModalWasShown: (state) => {
      state.wasShownVerify = true;
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    toCartAdded: (state, action) => {
      state.entities.cart = action.payload.cart;
    },
    unauthorizedCartIsUploaded: (state, action) => {
      state.cart = action.payload;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { userRequested, userReceved, userRequestField, authRequestSuccess, authRequestFailed, userCreated, userLoggedOut, userUploaded, authRequested, removedError, resetPasswordSuccess, favoriteAdded, favoriteDeleted, unauthorizedFavoriteUploaded, userCreateRequested, sendVerifyEmailRequested, verifyEmailIsSent, verifyModalWasShown, setIsVerified, toCartAdded, unauthorizedCartIsUploaded } = actions;

const userCreateFailed = createAction("users/userCreateFailed");
const userUploadRequested = createAction("users/userUploadRequested");
const userUploadFailed = createAction("users/userUploadFailed");
const removedErrorRequested = createAction("users/removedErrorRequested");
const removedErrorFailed = createAction("users/removedErrorFailed");
const userUnauthorizedFavoriteRequested = createAction("users/userUnauthorizedFavoriteRequested");
const userUnauthorizedFavoriteFailed = createAction("users/userUnauthorizedFavoriteFailed");
const userUnauthorizedCartRequested = createAction("users/userUnauthorizedCartRequested");
const userUnauthorizedCartFailed = createAction("users/userUnauthorizedCartFailed");
const sendVerifyEmailFailed = createAction("users/sendVerifyEmailFailed");
const resetVerifyEmailRequested = createAction("users/resetVerifyEmailRequested");
const resetVerifyEmailFailed = createAction("users/resetVerifyEmailFailed");
const isAlreadyInCart = createAction("users/isAlreadyInCart");

export const login = ({ payload, redirect }) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    const content = await authService.getIsVerified(data.idToken);
    const emailVerified = content.users[0].emailVerified;
    dispatch(setIsVerified(emailVerified));
    if (emailVerified) {
      dispatch(authRequestSuccess({ userId: data.localId }));
      localStorageService.setTokens(data);
      console.log(redirect);
      toast.success("Вы успешно вошли в систему!", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    } else {
      console.log("Подтвердите почту!");
    }
    // history.push(redirect);
    history.push("/account");
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
    dispatch(createUser({
      _id: data.localId,
      email,
      ...rest
    }));
    dispatch(sendVerifyEmail(data.idToken));

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
function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      await userService.create(payload);
      dispatch(userCreated());

    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}
function sendVerifyEmail(payload) {
  return async function (dispatch) {
    dispatch(sendVerifyEmailRequested());
    try {
      const { email } = await authService.verifyEmail(payload);
      dispatch(verifyEmailIsSent(email));

    } catch (error) {
      dispatch(sendVerifyEmailFailed(error.message));
    }
  };
}
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
  scroll.scrollToTop();
};


export function uploadUser(payload, redirect) {
  return async function (dispatch) {
    dispatch(userUploadRequested());
    try {
      const { content } = await userService.upload(payload);
      dispatch(userUploaded(content));
      history.push(redirect);
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
export const resetVerifyEmail = () => async (dispatch) => {
  dispatch(resetVerifyEmailRequested());
  try {
    dispatch(verifyModalWasShown());
  } catch (error) {
    dispatch(resetVerifyEmailFailed(error.message));
  }
};

// Favorite
export function uploadFavorite(payload) {
  return async function (dispatch, getState) {
    dispatch(userUploadRequested());
    try {
      const favoriteArray = getState().users.entities?.favorite ? getState().users.entities.favorite : [];
      const newFavoriteArray = [...favoriteArray];
      payload.forEach((f) => {
        if (!favoriteArray.includes(f)) {
          newFavoriteArray.push(f);
        }
      });
      const user = { ...getState().users.entities, favorite: newFavoriteArray };
      const { content } = await userService.upload(user);
      dispatch(userUploaded(content));
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
// Shopping cart
export function uploadCart(payload) {
  return async function (dispatch, getState) {
    dispatch(userUploadRequested());
    try {
      const cartArray = getState().users.entities?.cart ? getState().users.entities.cart : [];
      const newCartArray = [...cartArray];
      payload.forEach((localArrayItem) => {
        let isAdded = false;
        newCartArray.forEach((newCartItem) => {
          if (newCartItem.productId === localArrayItem.productId) {
            isAdded = true;
          }

        });
        if (!isAdded) {
          newCartArray.push(localArrayItem);
        }
      });
      const user = { ...getState().users.entities, cart: newCartArray };
      const { content } = await userService.upload(user);
      dispatch(userUploaded(content));
    } catch (error) {
      dispatch(userUploadFailed(error.message));
    }
  };
}
export function uploadCountInCart(payload) {
  return async function (dispatch, getState) {
    dispatch(userUploadRequested());
    try {
      const cartArray = getState().users.entities?.cart ? getState().users.entities.cart : [];
      const index = cartArray.findIndex((obj) => obj.productId === payload.productId);
      const newCartArray = [...cartArray];
      newCartArray[index] = payload;
      const user = { ...getState().users.entities, cart: newCartArray };
      const { content } = await userService.upload(user);
      dispatch(userUploaded(content));
    } catch (error) {
      dispatch(userUploadFailed(error.message));
    }
  };
}
export function uploadCountInUnauthorizedCart(payload) {
  return async function (dispatch, getState) {
    dispatch(userUnauthorizedCartRequested());
    try {
      const cartArray = getState().users.cart ? getState().users.cart : [];
      const index = cartArray.findIndex((obj) => obj.productId === payload.productId);
      const newCartArray = [...cartArray];
      newCartArray[index] = payload;
      localStorage.cart = JSON.stringify(newCartArray);
      dispatch(unauthorizedCartIsUploaded(newCartArray));
    } catch (error) {
      dispatch(userUnauthorizedCartFailed(error.message));
    }
  };
}
export function addToCart(payload) {
  return async function (dispatch, getState) {
    dispatch(userUploadRequested());
    try {
      const newCartArray = getState().users.entities.cart ? [...getState().users.entities.cart] : [];
      const index = newCartArray.findIndex((obj) => obj.productId === payload.productId);
      if (index > 0) {
        toast.success("Товар уже есть в корзине. Перейдите к заказу!", {
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
        dispatch(isAlreadyInCart());
      } else {
        newCartArray.push(payload);
        const user = { ...getState().users.entities, cart: newCartArray };
        const { content } = await userService.upload(user);
        dispatch(toCartAdded(content));
        toast.success("Товар добавлен в корзину!", {
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
      }

    } catch (error) {
      dispatch(userUploadFailed(error.message));
    }
  };
}
export function loadUnauthorizedCart() {
  return async function (dispatch) {
    dispatch(userUnauthorizedCartRequested());
    try {
      const cartArray = localStorage.cart ? JSON.parse(localStorage.cart) : [];
      dispatch(unauthorizedCartIsUploaded(cartArray));
    } catch (error) {
      dispatch(userUnauthorizedCartFailed(error.message));
    }
  };
}

export function addUnauthorizedToCart(payload) {
  return async function (dispatch, getState) {
    dispatch(userUnauthorizedCartRequested());
    try {
      const newCartArray = getState().users.cart ? [...getState().users.cart] : [];
      let isAdded = false;
      newCartArray.forEach(cartObj => {
        if (cartObj.productId === payload.productId) {
          // cartObj.count++;
          isAdded = true;
          console.log(cartObj, payload);
          toast.success("Товар уже есть в корзине. Перейдите к заказу!", {
            autoClose: 2000,
            hideProgressBar: true,
            theme: "dark",
          });
        }
      });
      if (!isAdded) {
        newCartArray.push(payload);
        localStorage.cart = JSON.stringify(newCartArray);
        dispatch(unauthorizedCartIsUploaded(newCartArray));
        toast.success("Товар добавлен в корзину!", {
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
      }

    } catch (error) {
      dispatch(userUnauthorizedCartFailed(error.message));
    }
  };
}
export function removeFromCart(payload) {
  return async function (dispatch, getState) {
    dispatch(userUploadRequested());
    try {
      const cartArray = getState().users.entities?.cart ? getState().users.entities.cart : [];
      const newCartArray = cartArray.filter((obj) => (obj.productId !== payload.productId));
      const user = { ...getState().users.entities, cart: newCartArray };
      const { content } = await userService.upload(user);
      dispatch(userUploaded(content));
    } catch (error) {
      dispatch(userUploadFailed(error.message));
    }
  };
}
export function removeFromUnauthorizedCart(payload) {
  return async function (dispatch, getState) {
    dispatch(userUnauthorizedCartRequested());
    try {
      const cartArray = getState().users.cart ? getState().users.cart : [];
      const newCartArray = cartArray.filter((obj) => obj.productId !== payload.productId);
      localStorage.cart = JSON.stringify(newCartArray);
      dispatch(unauthorizedCartIsUploaded(newCartArray));
    } catch (error) {
      dispatch(userUnauthorizedCartFailed(error.message));
    }
  };
}



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
export const getCart = () => state => state.users.entities?.cart;
export const getUnauthorizedFavorite = () => state => state.users.favorite;
export const getUnauthorizedCart = () => state => state.users.cart;
export const getIsVerified = () => state => state.users.isVerified;
export const getIsCreated = () => state => state.users.isCreated;
export const getVerifyEmail = () => state => state.users.verifyEmailIsSentTo;
export const getWasShownVerify = () => state => state.users.wasShownVerify;


export default usersReducer;
