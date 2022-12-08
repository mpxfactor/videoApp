import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectVideo } from "../redux/videoSlice";

const Description = styled.div`
    display: ${({ descExpand }) => (descExpand ? "block" : "none")};
    background-color: ${({ theme }) => theme.bgLighter};
    padding: 5px;
    font-size: 0.8rem;
    min-height: 100%;
    border-radius: 10px;
`;

const SmallVideoDesc = ({ descExpand }) => {
    const video = useSelector(selectVideo);
    return <Description descExpand={descExpand}>{video.desc}</Description>;
};

export default SmallVideoDesc;
