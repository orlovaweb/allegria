import { createAction, createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import goodService from "../services/good.service";

const goodsSlice = createSlice({
  name: "goods",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    goodsRequested: (state) => {
      state.isLoading = true;
    },
    goodsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    goodsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    productUploaded: (state, action) => {
      state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
    }
  }
});

const { reducer: goodsReducer, actions } = goodsSlice;
const { goodsRequested, goodsReceived, goodsRequestFailed, productUploaded } = actions;

const productUploadRequested = createAction("goods/productUploadRequested");
const productUploadFailed = createAction("goods/productUploadFailed");

export const loadGoodsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().goods;
  if (isOutdated(lastFetch)) {
    dispatch(goodsRequested());
    try {
      const { content } = await goodService.get();
      dispatch(goodsReceived(content));
    } catch (error) {
      dispatch(goodsRequestFailed(error.message));
    }
  }
};
export function uploadProduct(payload) {
  return async function (dispatch) {
    dispatch(productUploadRequested());
    try {
      const { content } = await goodService.upload(payload);
      dispatch(productUploaded(content));
    } catch (error) {
      dispatch(productUploadFailed(error.message));
    }
  };
}

export const getProductById = (productId) => state => {
  if (state.goods.entities) {
    return state.goods.entities.find(u => u._id === productId);
  }
};

export const getGoods = () => (state) => state.goods.entities;
export const getGoodsLoadingStatus = () => (state) => state.goods.isLoading;

export default goodsReducer;
