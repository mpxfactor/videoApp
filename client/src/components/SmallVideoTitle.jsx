import React from "react";
import { ExpandMore } from "@mui/icons-material";
import styled from "styled-components";
import formatDistance from "date-fns/formatDistance";
import { selectVideo } from "../redux/videoSlice";
import { useSelector } from "react-redux";

const VideoTitle = styled.div`
    font-size: 1.1rem;
    font-weight: 700;

    width: 100%;

    display: ${({ expand }) => (expand ? "none" : "flex")};
    align-items: center;

    padding: 0 5px;
`;

const VideoViews = styled.div`
    display: ${({ expand }) => (expand ? "none" : "block")};
    visibility: ${({ expand }) => (expand ? "hidden" : "visible")};

    /* margin-top: 5px; */
    padding: 0 5px;
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
`;

const Views = styled.p``;
const UploadedAgo = styled.p``;

const SmallVideoTitle = ({ handleDescExpand, expand }) => {
    const video = useSelector(selectVideo);
    const date = formatDistance(new Date(video.createdAt), new Date());

    return (
        <>
            <VideoTitle expand={expand}>
                {video.title}
                {/* <ExpandMore
                    style={{
                        alignSelf: "right",
                        marginLeft: "auto",
                        cursor: "pointer",
                    }}
                    onClick={handleDescExpand}
                /> */}
            </VideoTitle>
            <VideoViews expand={expand}>
                <Views>{video.views} views</Views>|
                <UploadedAgo>{date}</UploadedAgo>
            </VideoViews>
        </>
    );
};

export default SmallVideoTitle;
