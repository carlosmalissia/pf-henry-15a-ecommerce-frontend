import { configureStore } from "@reduxjs/toolkit";
import countPageReducer from './features/countPageSlice'
import { productApi } from "./services/productApi";
import { setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        countPageReducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([productApi.middleware])
})

 setupListeners(store.dispatch)