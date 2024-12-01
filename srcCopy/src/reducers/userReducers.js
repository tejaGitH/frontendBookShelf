import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout } from "../actions/userActions";
import { act } from "react";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                // console.log("Login Payload:", action.payload);
                state.loading = false;
                state.userInfo = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                console.log("Login Payload:",JSON.stringify(action.payload.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error =action.payload || action.error.message;
                console.error('Login failed', action.payload || action.error.message);
            });

        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                // state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder.addCase(logout.fulfilled, (state) => {
            state.userInfo = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
        });
    },
});

export const { setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;