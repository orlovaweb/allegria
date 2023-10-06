import { createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import sizesClothService from "../services/sizesCloth.service";

const sizesClothSlice = createSlice({
  name: "sizesCloth",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    sizesClothRequested: (state) => {
      state.isLoading = true;
    },
    sizesClothReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    sizesClothRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: sizesClothReducer, actions } = sizesClothSlice;
const { sizesClothRequested, sizesClothReceived, sizesClothRequestFailed } = actions;

export const loadSizesClothList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().sizesCloth;
  if (isOutdated(lastFetch)) {
    dispatch(sizesClothRequested());
    try {
      const { content } = await sizesClothService.get();
      dispatch(sizesClothReceived(content));
    } catch (error) {
      dispatch(sizesClothRequestFailed(error.message));
    }
  }
};

export const getSizesCloth = () => (state) => state.sizesCloth.entities;
export const getSizesClothLoadingStatus = () => (state) => state.sizesCloth.isLoading;

export default sizesClothReducer;
