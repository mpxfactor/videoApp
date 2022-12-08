import React from "react";
import styled from "styled-components";

const Container = styled.div`
    grid: main;
    background: #00000085;

    position: fixed;
    top: 60px;
    width: 100%;
    height: 100%;
    z-index: 2;
    /* z-index: -2; */
`;

const BlankPageForSearchClose = ({ handleBackClick }) => {
    return <Container onClick={handleBackClick}></Container>;
};

export default BlankPageForSearchClose;
