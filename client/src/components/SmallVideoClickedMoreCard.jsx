import { MoreVertOutlined, Share } from "@mui/icons-material";
// import axios from "axios";
import { axiosInstance } from "../config";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import formatDistance from "date-fns/formatDistance";

import { RWebShare } from "react-web-share";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 380px;
    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        width: 360px;
        height: 350px;
    }
`;

const VideoDiv = styled.div`
    width: 100%;
    height: 150px;
    background-color: ${({ theme }) => theme.bgLighter};

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Video = styled.img`
    width: 100%;
    height: 100%;
    margin: 10px 0;
    object-fit: contain;
`;

const VideoDetails = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    padding: 5px;
`;

const VideoTitle = styled.p`
    font-size: 1.1rem;
    font-weight: 700;

    width: 100%;
`;

const ImgDiv = styled.div`
    border-radius: 50%;
    background-color: #aa5cc6;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
`;

const ChannelLogo = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
`;

const ExtraDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 5px;
`;

const Div = styled.div`
    display: flex;
    gap: 5px;
`;

/////////////////////////////////////////////////////////

export const Videos = styled.video`
    width: 100%;
    max-height: 200px;
    /* background-color: #00ffa2; */
    /* border-radius: 15px; */
    margin: 10px 0;
    @media (min-width: 641px) {
        min-height: 280px;
    }
`;
/////////////////////////////////////////////////////////

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    padding: 10px;
    width: 75%;
    align-self: center;

    border: none;
    border-radius: 15px;

    margin-top: 10px;

    &:active {
        background-color: #4fff7e;
        box-shadow: 0 1px #666;
        transform: translateY(4px);
    }
`;

const Text = styled.p`
    font-size: 1rem;
`;

const Views = styled.p``;
const UploadedAgo = styled.p``;

const ChannelName = styled.p``;
//////////////////////////////////////////////////////////////////
const SmallVideoClickedMoreCard = ({ video, channel }) => {
    const [channelName, setChannelName] = useState({});

    useEffect(() => {
        const fetchChannelName = async () => {
            try {
                const channel = await axiosInstance(
                    `/users/find/${video.userId}`
                );
                setChannelName(channel.data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchChannelName();
    }, [video.userId]);

    const date = formatDistance(new Date(video.createdAt), new Date());

    // //////////////////////////////////////////////////////////
    const link = useLocation().pathname;
    const title = video.title;
    // //////////////////////////////////////////////////////////
    return (
        <Container>
            {/* <VideoDiv> */}
            {/* <Video src={video.imgUrl} /> */}
            <Videos
                src={video.videoUrl}
                loop
                muted
                autoplay
                playsinline
                controls
                typeof="video/mp4"
            />
            {/* </VideoDiv> */}
            <VideoDetails>
                <ImgDiv>
                    <ChannelLogo src={channelName.img} />
                </ImgDiv>
                <ExtraDetails>
                    <VideoTitle>{video.title}</VideoTitle>
                    <ChannelName>{channelName.name}</ChannelName>
                    <Div>
                        <Views>{video.views} views</Views>|
                        <UploadedAgo>{date}</UploadedAgo>
                    </Div>
                </ExtraDetails>
            </VideoDetails>

            <RWebShare
                data={{
                    text: `${title}`,
                    url: `https://mpxfacor-youtube-test-1.herokuapp.com${link}`,
                    title: "MPXtube",
                }}
            >
                <Button type="button">
                    <Share />
                    <Text>Share</Text>
                </Button>
            </RWebShare>
        </Container>
    );
};

export default SmallVideoClickedMoreCard;
