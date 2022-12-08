import React from "react";
import styled from "styled-components";
import { Send } from "@mui/icons-material";

const NewComment = styled.div`
    background-color: ${({ theme }) => theme.bgLighter};
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px;
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

    resize: none;
`;

const BigNewComment = () => {
    return (
        <NewComment>
            <Input placeholder="Type comment here..." />
            <Send />
        </NewComment>
    );
};

export default BigNewComment;
