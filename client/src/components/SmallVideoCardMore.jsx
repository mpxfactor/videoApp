import React from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";
import { Card } from "@mui/material";
import SmallVideoClickedMoreCard from "./SmallVideoClickedMoreCard";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    /* top: 0; */
    left: 0;
    bottom: 0;

    background-color: #00000086;
`;

const Wrapper = styled.div`
    /* display: ${({ more }) => (more ? "none" : "block")}; */
    position: fixed;
    bottom: 0;

    /* height: 200px; */
    width: 100%;
    background-color: black;

    animation-name: slideFromBottom;
    animation-duration: 1s;
    animation-delay: 0s;
    animation-fill-mode: both;

    @keyframes slideFromBottom {
        from {
            bottom: -100%;
        }
        to {
            bottom: 0%;
        }
    }
`;

const Button = styled.div`
    cursor: pointer;
    padding: 5px;
    background-color: #9a0000;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: 10px;
    margin-top: 5px;

    width: 2rem;
    height: 2rem;
`;

const SmallVideoCardMore = ({ more, handleSetMore, video }) => {
    return (
        <>
            <Container onClick={handleSetMore}></Container>
            <Wrapper more={more}>
                <Button onClick={handleSetMore}>
                    <Close />
                </Button>
                <SmallVideoClickedMoreCard video={video} />
            </Wrapper>
        </>
    );
};

export default SmallVideoCardMore;
