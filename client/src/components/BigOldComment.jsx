import React from "react";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import styled from "styled-components";

const ChannelLogo = styled.div`
    border-radius: 50%;
    background-color: blue;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    grid-area: logo;
`;

const ChannelName = styled.div`
    grid-area: channel;
    font-weight: 700;
    display: flex;
    align-items: cneter;
`;

const OldComments = styled.div`
    display: grid;
    grid-template-columns: 60px 1fr 1fr;
    grid-template-areas: "logo channel ago" "logo comment comment" "logo reaction reaction";
    margin: 5px;
    margin-bottom: 15px;
`;

const Comment = styled.p`
    grid-area: comment;
    margin-top: 0.3rem;
`;

const CommentReaction = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
    grid-area: reaction;
    align-items: center;
`;

const Ago = styled.p`
    font-size: 0.7rem;
    margin-left: 5px;
`;

const ButtonReply = styled.button`
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};

    cursor: pointer;
    border: none;
    outline: none;
    font-size: 0.7rem;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;

    padding: 10px 10px;
`;

const BigOldComment = () => {
    return (
        <OldComments>
            <ChannelLogo />
            <ChannelName>
                {} <Ago>5 minutes ago</Ago>
            </ChannelName>
            <Comment>
                 {}
            </Comment>
            <CommentReaction>
                <ThumbUp style={{ fontSize: "1.2rem" }} /> 21
                <ThumbDown style={{ fontSize: "1.2rem" }} />
                <ButtonReply>Reply</ButtonReply>
            </CommentReaction>
        </OldComments>
    );
};

export default BigOldComment;
