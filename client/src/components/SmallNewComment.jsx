import React from "react";
import { Send } from "@mui/icons-material";
import styled from "styled-components";

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

const SmallNewComment = () => {
    return (
        <NewComment >
            <Input placeholder="Type comment here..." />
            <Send />
        </NewComment>
    );
};

export default SmallNewComment;
