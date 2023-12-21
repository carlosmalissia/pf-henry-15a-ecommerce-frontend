// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    // Otros campos de sesión que desees almacenar
  },
  reducers: {
    getlogindata: (state) => {
        if (!state.user) {
            const userData = JSON.parse(localStorage.getItem("user"));
            if (userData) {
              state.user = userData.user;
            }
        }
    },
    loginUser: (state, action) => {
        console.log(action.payload); 
      // Almacena la información del usuario y el token en el estado
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Almacena también en el localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      
    },
    logoutUser: (state) => {
      // Limpia la información del usuario y el token del estado
      state.user = null;
      state.token = null;
      // Limpia también el localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    // Otros reducers según tus necesidades
  },
});

export const { loginUser, logoutUser,getlogindata } = authSlice.actions;
export default authSlice.reducer;