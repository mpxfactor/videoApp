import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SmallOldComment from "./SmallOldComment";
import { Send, UnfoldMore } from "@mui/icons-material";
import SmallNewComment from "./SmallNewComment";
import {
    fetchComments,
    fetchCommentStart,
    fetchCommentSuccess,
    getPostCommentErrors,
    getPostCommentstatus,
    newCom,
    selectComment,
} from "../redux/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config";
import { selectUser } from "../redux/userSlice";

const Comment = styled.div`
    background-color: ${({ theme }) => theme.bgLighter};
    width: 100%;

    height: 400px;

    margin: 5px;
    padding: 10px 5px 500px;
    border-radius: 10px;

    display: ${({ expand }) => (expand ? "flex" : "none")};

    flex-direction: column;
    align-self: center;
    gap: 5px;

    overflow-y: auto;

    position: sticky;
`;

const CommentCount = styled.div`
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 10px;
`;

const NewComment = styled.div`
    display: flex;
    gap: 5px;
`;

const Input = styled.textarea`
    background-color: transparent;
    color: ${({ theme }) => theme.text};

    font-size: 1rem;
    height: 30px;
    border: none;
    border-bottom: 1px solid #868686;
    outline: none;
    width: 100%;

    margin-bottom: 10px;

    resize: none;
`;

const Text = styled.p`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;

const Hr = styled.hr`
    margin: 5px 0px;
    border: 1px solid ${({ theme }) => theme.white};
`;

const SmallComments = ({ commentShow, expand, handleExpand, videoId }) => {
    const currentUser = useSelector(selectUser);
    const currentComments = useSelector(selectComment);
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState("");

    const handleSend = async () => {
        try {
            const res = await axiosInstance.post(
                `/comments`,
                {
                    videoId,
                    desc: newComment,
                },
                { withCredentials: true }
            );
            dispatch(newCom(res.data));
            setNewComment("");
        } catch (err) {}
    };

    useEffect(() => {
        const fetchComments = async () => {
            dispatch(fetchCommentStart());
            try {
                const res = await axiosInstance.get(`/comments/${videoId}`);
                dispatch(fetchCommentSuccess(res.data));
            } catch (err) {}
        };

        fetchComments();
    }, [videoId, dispatch]);
    return (
        <Comment commentShow={commentShow} expand={expand}>
            <CommentCount>
                Comments
                <UnfoldMore
                    style={{
                        alignSelf: "right",
                        marginLeft: "auto",
                        cursor: "pointer",
                    }}
                    onClick={handleExpand}
                />
            </CommentCount>
            {currentUser._id ? (
                <NewComment>
                    <Input
                        placeholder="Type comment here..."
                        onChange={(event) => setNewComment(event.target.value)}
                        value={newComment}
                    />
                    <Send style={{ cursor: "pointer" }} onClick={handleSend} />
                </NewComment>
            ) : (
                <Text>Sign in to Comment</Text>
            )}
            <Hr />

            {currentComments
                ? currentComments.map((comment) => (
                      <SmallOldComment key={comment._id} comment={comment} />
                  ))
                : "loading"}
        </Comment>
    );
};

export default SmallComments;
