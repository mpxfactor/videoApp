import React from "react";
import styled from "styled-components";

const Description = styled.div`
    background-color: ${({ theme }) => theme.bgLighter};
    margin: 15px 0;
    padding: 10px;
    border-radius: 10px;
`;
const Views = styled.p`
    font-weight: 600;
    margin-bottom: 10px;
`;
const Desc = styled.p`
    font-size: 0.8rem;
`;

const BigVideoDesc = () => {
    return (
        <Description>
            <Views>10k views | 1 day ago</Views>
            <Description>{}</Description>
        </Description>
    );
};

export default BigVideoDesc;
