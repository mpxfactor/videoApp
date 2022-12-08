import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    width: 100%;
    height: 250px;

    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        width: 100%;
        height: 150px;
    }
`;

const Video = styled.img`
    width: 150px;
    height: 100px;
    /* background-color: #00ccffba; */
    border-radius: 15px;
    margin: 10px 0;
    object-fit: cover;
`;

const VideoDetails = styled.div`
    display: flex;
    gap: 10px;
`;

const VideoTitle = styled.p`
    font-size: 0.8rem;
`;

const ExtraDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const Div = styled.div`
    display: flex;
    gap: 5px;
`;

const Views = styled.p`
    font-size: 0.7rem;
`;
const UploadedAgo = styled.p`
    font-size: 0.7rem;
`;

const ChannelName = styled.p`
    font-size: 0.7rem;
`;
const BigRecommendationCard = () => {
    const refreshPage = () => {
        // window.location.reload();
    };
    return (
        <Container>
            <Link to="/video/:id" onClick={refreshPage}>
                <Video  />
            </Link>
            <VideoDetails>
                <ExtraDetails>
                    <VideoTitle>{}</VideoTitle>
                    <ChannelName>{}</ChannelName>
                    <Div>
                        <Views>1k views</Views>|
                        <UploadedAgo>1 day ago</UploadedAgo>
                    </Div>
                </ExtraDetails>
            </VideoDetails>
        </Container>
    );
};

export default BigRecommendationCard;
