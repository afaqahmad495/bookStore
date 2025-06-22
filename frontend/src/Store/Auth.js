import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false, roll: "user"},
    reducers:{
        login(state){
            state.isLoggedIn = true; 
        },
        logout(state){
            state.isLoggedIn = false
        },
        changeRole(state, action){
            const roll = action.payload;
            state.roll = roll
        }
    }
});
export const authActions = authSlice.actions;
export default authSlice.reducer; 