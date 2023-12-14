import {createSlice} from '@reduxjs/toolkit'

const initialState= {
    page: 1,
    pageSize : 6

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
        },
        pageone:(state) =>{
            state.page = 1
        }
    }
})

export const {increment, decrement, pageone} = countPageSlice.actions
export default countPageSlice.reducer

