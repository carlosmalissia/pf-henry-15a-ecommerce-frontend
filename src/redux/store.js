import { configureStore } from "@reduxjs/toolkit";
import countPageReducer from "./features/countPageSlice";
import cartReducer from "./features/cart";
import { productApi } from "./services/productApi";
import { userApi } from "./services/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import loginReducer from "./features/userSlice";
import authReducer from "./features/userSlice";
import { reviewsApi } from "./services/reviewsApi";
import { purchaseHistoryApi } from "./services/purchaseHistoryApi";
import { favoritesApi } from "./services/favoritesApi";

export const store = configureStore({
  reducer: {
    [purchaseHistoryApi.reducerPath]: purchaseHistoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [purchaseHistoryApi.reducerPath]: purchaseHistoryApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    cartReducer,
    countPageReducer,
    loginReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      userApi.middleware,
      reviewsApi.middleware,
      purchaseHistoryApi.middleware,
      favoritesApi.middleware,
    ]),
});

setupListeners(store.dispatch);
