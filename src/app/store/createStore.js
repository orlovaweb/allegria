import { combineReducers, configureStore } from "@reduxjs/toolkit";
import brandsReducer from "./brands";
import categoriesReducer from "./categories";
import goodsReducer from "./goods";
import sizesClothReducer from "./sizesCloth";
import sizesShoesReducer from "./sizesShoes";
import usersReducer from "./users";
import subscriptionReducer from "./subscription";
import lettersReducer from "./letters";


const rootReducer = combineReducers({ brands: brandsReducer, categories: categoriesReducer, goods: goodsReducer, sizesCloth: sizesClothReducer, sizesShoes: sizesShoesReducer, users: usersReducer, subscription: subscriptionReducer, letters: lettersReducer });

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
