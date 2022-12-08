import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { axiosInstance } from "../config";

const initialState = {
    user: {},
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state) => {
            state = { loading: false, error: true };
        },
        subscription: (state, action) => {
            if (state.user.subscribedChannel.includes(action.payload)) {
                state.user.subscribedChannel.splice(
                    state.user.subscribedChannel.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.user.subscribedChannel.push(action.payload);
            }
        },
        clearResults: (state, action) => {
            state = initialState;
            return state;
        },
    },
});

export const selectUser = (state) => state.users.user;
export const getPostUserStatus = (state) => state.users.status;
export const getPostUserErrors = (state) => state.users.error;

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    subscription,
    clearResults,
} = userSlice.actions;

export default userSlice.reducer;
