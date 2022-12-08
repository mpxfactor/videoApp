import { MoreVertOutlined } from "@mui/icons-material";
// import axios from "axios";
import { axiosInstance } from "../config";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import formatDistance from "date-fns/formatDistance";

////////////////////////////////////////////////
import useAnalyticsEventTracker from "../utils/useAnalyticsEventTracker";

////////////////////////////////////////////////

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        width: 360px;
        height: 350px;
    }
`;

const VideoDiv = styled.div`
    width: 100%;
    height: 210px;
    background-color: ${({ theme }) => theme.bgLighter};

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Video = styled.img`
    width: 100%;
    height: 100%;
    margin: 10px 0;
    object-fit: cover;
    background-position: center;
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

const Views = styled.p``;
const UploadedAgo = styled.p``;

const ChannelName = styled.p``;
const SmallRecommendationCard = ({ video }) => {
    ///////////////////////////////////////////////////////
    const gaEventTracker = useAnalyticsEventTracker("videos");
    ///////////////////////////////////////////////////////

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

    return (
        <Container>
            <Link
                to={`/video/${video._id}`}
                style={{ textDecoration: "none" }}
                onClick={() => gaEventTracker(video.title)}
            >
                <VideoDiv>
                    <Video src={video.imgUrl} />
                </VideoDiv>
            </Link>
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
                <MoreVertOutlined
                    style={{
                        fontSize: "1.5rem",
                        marginLeft: "auto",
                        cursor: "pointer",
                    }}
                />
            </VideoDetails>
        </Container>
    );
};

export default SmallRecommendationCard;
