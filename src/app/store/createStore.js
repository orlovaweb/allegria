import { combineReducers, configureStore } from "@reduxjs/toolkit";
import brandsReducer from "./brands";
import categoriesReducer from "./categories";
import goodsReducer from "./goods";
import sizesClothReducer from "./sizesCloth";
import sizesShoesReducer from "./sizesShoes";


const rootReducer = combineReducers({ brands: brandsReducer, categories: categoriesReducer, goods: goodsReducer, sizesCloth: sizesClothReducer, sizesShoes: sizesShoesReducer });

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
