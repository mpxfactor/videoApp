import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { axiosInstance } from "../config";
// const POSTS_URL =
//     "http://localhost:8080/api/videos/find/63609479ff5443d4119445e6";

const initialState = {
    video: {},
    loading: false,
    error: false,
};

// export const fetchVideos = createAsyncThunk(
//     "videos/fetchVideos",
//     async (url) => {
//         try {
//             const videoUrl = `/videos/find/${url}`;
//             const response = await axiosInstance.get(videoUrl);
//             return response.data;
//         } catch (error) {
//             return error.message;
//         }
//     }
// );

const videoSlice = createSlice({
    name: "videos",
    initialState: initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.video = action.payload;
        },
        fetchFailure: (state) => {
            state = initialState;
        },
        like: (state, action) => {
            if (!state.video.likes.includes(action.payload)) {
                state.video.likes.push(action.payload);
                state.video.dislikes.splice(
                    state.video.dislikes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
        dislike: (state, action) => {
            if (!state.video.dislikes.includes(action.payload)) {
                state.video.dislikes.push(action.payload);
                state.video.likes.splice(
                    state.video.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }
        },
    },
    // extraReducers(builder) {
    //     builder
    //         .addCase(fetchVideos.pending, (state, action) => {
    //             state.status = "loading";
    //         })
    //         .addCase(fetchVideos.fulfilled, (state, action) => {
    //             state.status = "succeeded";
    //             state.video = action.payload;
    //         })
    //         .addCase(fetchVideos.rejected, (state, action) => {
    //             state.status = "failed";
    //             state.error = action.error.message;
    //         });
    // },
});

export const selectVideo = (state) => state.videos.video;
export const getPostStatus = (state) => state.videos.status;
export const getPostErrors = (state) => state.videos.error;

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
    videoSlice.actions;

export default videoSlice.reducer;
