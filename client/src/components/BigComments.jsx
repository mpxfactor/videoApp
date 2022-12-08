import React from "react";
import styled from "styled-components";
import { Sort } from "@mui/icons-material";
import BigOldComment from "./BigOldComment";
import BigNewComment from "./BigNewComment";

const Comments = styled.div``;
const CommentsCount = styled.p``;

const CommentSort = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
`;

const BigComments = () => {
    return (
        <Comments>
            <BigNewComment />
            <CommentSort>
                <CommentsCount>1 Comments</CommentsCount>
                <Sort /> Sort by
            </CommentSort>
            <BigOldComment />
        </Comments>
    );
};

export default BigComments;
