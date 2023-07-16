import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        user:{ },
        isUserLogin: false,
    },
    reducers:{
        loginSuccess : (state , action)=>{
            state.user=action.payload;
            state.isUserLogin=true;
        },
        loginFailed: (state)=>{
            state.user ={};
            state.isUserLogin = false;
        },
        logout: (state) => {
            state.user = {};
            state.isUserLogin = false;
        },
        userUpdate : (state , action) =>{
            state.user =action.payload;
        }
    },
});

export const {loginSuccess , loginFailed , logout , userUpdate} = authSlice.actions;
export default authSlice.reducer;