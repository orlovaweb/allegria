import { createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import sizesShoesService from "../services/sizesShoes.service";

const sizesShoesSlice = createSlice({
  name: "sizesShoes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    sizesShoesRequested: (state) => {
      state.isLoading = true;
    },
    sizesShoesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    sizesShoesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: sizesShoesReducer, actions } = sizesShoesSlice;
const { sizesShoesRequested, sizesShoesReceived, sizesShoesRequestFailed } = actions;

export const loadSizesShoesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().sizesShoes;
  if (isOutdated(lastFetch)) {
    dispatch(sizesShoesRequested());
    try {
      const { content } = await sizesShoesService.get();
      dispatch(sizesShoesReceived(content));
    } catch (error) {
      dispatch(sizesShoesRequestFailed(error.message));
    }
  }
};

export const getSizesShoes = () => (state) => state.sizesShoes.entities;
export const getSizesShoesLoadingStatus = () => (state) => state.sizesShoes.isLoading;

export default sizesShoesReducer;
