import { createAction, createSlice } from "@reduxjs/toolkit";
import goodService from "../services/good.service";
import history from "../utils/history";
import isOutdated from "../utils/isOutdated";
import { toast } from "react-toastify";

const goodsSlice = createSlice({
  name: "goods",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
    searchItem: null
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
    },
    searchItemIsSet: (state, action) => {
      state.searchItem = action.payload;
    },
    searchItemIsCleared: (state) => {
      state.searchItem = null;
    },
    productDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { reducer: goodsReducer, actions } = goodsSlice;
const { goodsRequested, goodsReceived, goodsRequestFailed, productUploaded, searchItemIsSet, searchItemIsCleared, productDeleted } = actions;

const productUploadRequested = createAction("goods/productUploadRequested");
const productUploadFailed = createAction("goods/productUploadFailed");
const removeProductRequested = createAction("goods/removeProductRequested");
const removeProductFailed = createAction("goods/removeProductFailed");

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
export function removeProduct(payload) {
  return async function (dispatch) {
    dispatch(removeProductRequested());
    try {
      const { content } = await goodService.delete(payload);
      if (content === null) {
        dispatch(productDeleted(payload));
      }
      toast.success("Продукт был успешно удалён", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    } catch (error) {
      dispatch(removeProductFailed(error.message));
      toast.error("Что-то пошло не так. Попробуйте позже.", {
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    }
  };
}
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
export const setSearchItem = (payload) => dispatch => {
  dispatch(searchItemIsSet(payload));
  history.push("/goods");
};
export const clearSearchItem = () => dispatch => {
  dispatch(searchItemIsCleared());
};
export const getProductById = (productId) => state => {
  if (state.goods.entities) {
    return state.goods.entities.find(u => u._id === productId);
  }
};

export const getGoods = () => (state) => state.goods.entities;
export const getGoodsLoadingStatus = () => (state) => state.goods.isLoading;
export const getSearchItem = () => (state) => state.goods.searchItem;

export default goodsReducer;
