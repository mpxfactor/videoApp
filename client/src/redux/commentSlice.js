import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { axiosInstance } from "../config";

const initialState = {
    comment: false,
    loading: false,
    error: false,
};

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (videoId) => {
        try {
            const commentsUrl = `/comments/${videoId}`;
            const res = await axiosInstance.get(commentsUrl);
            return res.data;
        } catch (error) {
            return error.message;
        }
    }
);
const commentslice = createSlice({
    name: "comments",
    initialState: initialState,
    reducers: {
        fetchCommentStart: (state) => {
            state.loading = true;
        },
        fetchCommentSuccess: (state, action) => {
            state.loading = false;
            state.comment = action.payload;
        },
        fetchCommentFailure: (state) => {
            state = initialState;
        },
        newCom: (state, action) => {
            state.comment.push(action.payload);
        },
    },
});

export const selectComment = (state) => state.comments.comment;
export const getPostCommentstatus = (state) => state.comments.status;
export const getPostCommentErrors = (state) => state.comments.error;

export const {
    fetchCommentStart,
    fetchCommentSuccess,
    fetchCommentFailure,
    newCom,
} = commentslice.actions;

export default commentslice.reducer;
