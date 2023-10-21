import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import letterService from "../services/letter.service";
import isOutdated from "../utils/isOutdated";

const lettersSlice = createSlice({
  name: "letters",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    lettersRequested: (state) => {
      state.isLoading = true;
    },
    lettersReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    lettersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    letterCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    letterDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { reducer: lettersReducer, actions } = lettersSlice;
const { lettersRequested, lettersReceived, lettersRequestFailed, letterCreated, letterDeleted } = actions;

const addLetterRequested = createAction("letters/addLetterRequested");
const addLetterFailed = createAction("letters/addLetterFailed");
const removeLetterRequested = createAction("letters/removeLetterRequested");
const removeLetterFailed = createAction("letters/removeLetterFailed");

export const loadLettersList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().letters;
  if (isOutdated(lastFetch)) {
    dispatch(lettersRequested());
    try {
      const { content } = await letterService.get();
      dispatch(lettersReceived(content));
    } catch (error) {
      dispatch(lettersRequestFailed(error.message));
    }
  }
};
export function addLetter(payload) {
  return async function (dispatch) {
    dispatch(addLetterRequested());
    try {
      const letterObj = { _id: nanoid(), ...payload };
      const { content } = await letterService.create(letterObj);
      dispatch(letterCreated(content));
      toast.success("Письмо было успешно отправлено", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });

    } catch (error) {
      dispatch(addLetterFailed(error.message));
      toast.error("Что-то пошло не так. Попробуйте позже.", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    }
  };
}
export function removeLetter(payload) {
  return async function (dispatch) {
    dispatch(removeLetterRequested());
    try {
      const { content } = await letterService.delete(payload);
      if (content === null) {
        dispatch(letterDeleted(payload));
      }
      toast.success("Письмо было успешно удалено", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    } catch (error) {
      dispatch(removeLetterFailed(error.message));
      toast.error("Что-то пошло не так. Попробуйте позже.", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    }
  };
}

export const getLetters = () => (state) => state.letters.entities;
export const getLettersLoadingStatus = () => (state) => state.letters.isLoading;

export default lettersReducer;
