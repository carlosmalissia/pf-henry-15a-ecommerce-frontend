import { configureStore } from "@reduxjs/toolkit";
import countPageReducer from './features/countPageSlice'

export const store = configureStore({
    reducer: {
        countPageReducer
    }
})

