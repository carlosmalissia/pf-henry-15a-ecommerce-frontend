import {createSlice} from '@reduxjs/toolkit'

const initialState= {
    page: 1
}

export const countPageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        increment: (state) => {
            state.page += 1
        },
        decrement: (state) => {
            state.page -= 1
        }
    }
})

export const {increment, decrement} = countPageSlice.actions
export default countPageSlice.reducer

