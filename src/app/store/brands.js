import { createSlice } from "@reduxjs/toolkit";
import brandService from "../services/brand.service";
import isOutdated from "../utils/isOutdated";

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    brandsRequested: (state) => {
      state.isLoading = true;
    },
    brandsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    brandsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: brandsReducer, actions } = brandsSlice;
const { brandsRequested, brandsReceived, brandsRequestFailed } = actions;

export const loadBrandsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().brands;
  if (isOutdated(lastFetch)) {
    dispatch(brandsRequested());
    try {
      const { content } = await brandService.get();
      dispatch(brandsReceived(content));
    } catch (error) {
      dispatch(brandsRequestFailed(error.message));
    }
  }
};

export const getBrands = () => (state) => state.brands.entities;
export const getBrandsLoadingStatus = () => (state) => state.brands.isLoading;

export default brandsReducer;
