import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import SmallComments from "./SmallComments";
import SmallExtraDetails from "./SmallExtraDetails";
import SmallVideoDesc from "./SmallVideoDesc";
import SmallVideoDetatils from "./SmallVideoDetatils";
import SmallVideoTitle from "./SmallVideoTitle";
import {
    fetchVideos,
    getPostErrors,
    getPostStatus,
    selectVideo,
} from "../redux/videoSlice";
// import axios from "axios";
import { axiosInstance } from "../config";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: ${({ expand }) => (expand ? "100%" : "400px")};
    @media (min-width: 641px) {
        height: ${({ expand }) => (expand ? `100%` : "530px")};
    }
    @media (min-width: 961px) {
        display: none;
    }
`;

const Button = styled.button`
    width: 90%;
    height: 40px;
    border: none;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bgLighter};
    border-radius: 15px;
    margin: 0 auto;
    cursor: pointer;

    display: ${({ expand }) => (expand ? "none" : "block")};
`;

const Text = styled.p`
    text-align: center;
`;

export const Videos = styled.video`
    width: 100%;
    max-height: 210px;
    /* background-color: #00ffa2; */
    /* border-radius: 15px; */
    margin: 10px 0;
    @media (min-width: 641px) {
        min-height: 280px;
    }
`;

const SmallVideoCard = ({ videos, channel, videoStatus }) => {
    const [expand, setExpand] = useState(false);
    const handleExpand = () => {
        setExpand(!expand);
    };
    const [descExpand, setDescExpand] = useState(false);
    const handleDescExpand = () => {
        setDescExpand(!descExpand);
    };

    // console.log(videos);
    // if (videoStatus === "succeeded") {
    //     try {
    //         axios.put("/videos/view/636e2e3fdb3a61bc32aedeb0");
    //         console.log(videos.views);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // console.log(expand);

    if (expand === true) {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }

    return (
        <Container expand={expand}>
            <Videos
                src={videos.videoUrl}
                loop
                muted
                autoplay
                playsinline
                controls
                typeof="video/mp4"
            />

            <SmallVideoTitle
                handleDescExpand={handleDescExpand}
                expand={expand}
            />
            <SmallVideoDesc descExpand={descExpand} />
            {descExpand ? (
                ""
            ) : (
                <>
                    <SmallExtraDetails channel={channel} expand={expand} />
                    <SmallVideoDetatils
                        channel={channel}
                        handleExpand={handleExpand}
                        expand={expand}
                    />
                    <SmallComments
                        expand={expand}
                        handleExpand={handleExpand}
                        videoId={videos._id}
                    />
                    {/* <Button
                        type="button"
                        onClick={handleExpand}
                        expand={expand}
                    >
                        <Text>Comments</Text>
                    </Button> */}
                </>
            )}
        </Container>
    );
};

export default SmallVideoCard;
