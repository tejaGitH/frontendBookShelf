import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout } from "../actions/userActions";

///reducers handles state

const initialState = {
    userInfo: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null,
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
        // Handle login action states
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                // state.loading = false;
                // state.userInfo = action.payload.user;
                // state.isAuthenticated = true;
                state.loading = false;
                state.userInfo = action.payload.user;
                state.isAuthenticated = true;
                state.token = action.payload.token; // Save token in Redux state
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Handle register action states
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.isAuthenticated = true; // Assuming registration auto-logs in the user
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Handle logout action
        builder.addCase(logout.fulfilled, (state) => {
            // state.userInfo = null;
            // state.isAuthenticated = false;
            state.userInfo = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); 
        });
    },
});

export const { setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";
// import {login,register,logout} from "../actions/userActions"

// const initialState = {
//     userInfo: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null,
// }

// const userSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers:{
//         setIsAuthenticated: (state,action)=>{
//             state.isAuthenticated = action.payload;
//         },
//     },
//     extraReducers:(builder)=>{
//         builder
//         .addCase(login.pending,(state)=>{
//             state.loading = true;
//             state.error=null;
//         })
//         .addCase(login.fulfilled,(state,action)=>{
//             state.loading = false;
//             state.userInfo = action.payload.user;
//             state.isAuthenticated=true;
//         })
//         .addCase(login.rejected,(state,action)=>{
//             state.loading = false;
//             state.error = action.error.message;
//         })
//         .addCase(register.pending, (state) => {
//             state.loading = true;
//             state.error = null; 
//         })// Reset error on new request
//         .addCase(register.fulfilled,(state,action)=>{
//             state.userInfo = action.payload; //payload contains userInfo after registration
//         })
//         .addCase(register.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message; // Capture error message
//         })
//         .addCase(logout.fulfilled, (state) => {
//             state.userInfo = null; // Clear user info on logout
//             state.isAuthenticated=false;
//         });
//     }
// })

// export const {setIsAuthenticated}=userSlice.actions;
// export default userSlice.reducer;



// // import { createAction, createReducer } from "@reduxjs/toolkit";
// // import axios from 'axios';

// // export const login = createAction('LOGIN');
// // export const register= createAction('REGISTER');

// // const initialState = {};

// // const userReducer = createReducer(initialState, {
// //     [login.fulfilled]: (state,action)=>action.payload,
// //     [register.fulfilled]: (state,action)=> action.payload,
// // });

// // export default userReducer;