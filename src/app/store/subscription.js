import { createAction, createSlice } from "@reduxjs/toolkit";
import subscriptionService from "../services/subscription.service";
import isOutdated from "../utils/isOutdated";
import { nanoid } from "nanoid";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    subscriptionRequested: (state) => {
      state.isLoading = true;
    },
    subscriptionReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    subscriptionRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    subscriptionCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
  }
});

const { reducer: subscriptionReducer, actions } = subscriptionSlice;
const { subscriptionRequested, subscriptionReceived, subscriptionRequestFailed, subscriptionCreated } = actions;

const addSubscriptionRequested = createAction("subscription/addSubscriptionRequested");
const addSubscriptionFailed = createAction("subscription/addSubscriptionFailed");

export const loadSubscriptionList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().subscription;
  if (isOutdated(lastFetch)) {
    dispatch(subscriptionRequested());
    try {
      const { content } = await subscriptionService.get();
      dispatch(subscriptionReceived(content));
    } catch (error) {
      dispatch(subscriptionRequestFailed(error.message));
    }
  }
};
export function addSubscription(payload) {
  return async function (dispatch) {
    dispatch(addSubscriptionRequested());
    try {
      const subscriptionObj = { _id: nanoid(), email: payload };
      const { content } = await subscriptionService.create(subscriptionObj);
      dispatch(subscriptionCreated(content));

    } catch (error) {
      dispatch(addSubscriptionFailed(error.message));
    }
  };
}

export const getSubscription = () => (state) => state.subscription.entities;
export const getSubscriptionLoadingStatus = () => (state) => state.subscription.isLoading;
// export const getSubscriptionArray = () => (state) => {
//   const subscriptionArrayOfObjects = state.subscription.entities;
//   return subscriptionArrayOfObjects.map(s => s.email);
//   // return subscriptionArrayOfObjects ? subscriptionArrayOfObjects.map(s => s.email) : [];
// };

export default subscriptionReducer;
