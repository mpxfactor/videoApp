import React from "react";
import {
    FavoriteOutlined,
    NotificationAdd,
    Share,
    ThumbDown,
    ThumbUp,
} from "@mui/icons-material";
import styled from "styled-components";

const Title = styled.p``;

const VideoDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ChannelDetails = styled.div`
    display: grid;
    grid-template-columns: auto(3, 1fr);
    column-gap: 10px;
    grid-template-areas: "logo channel channel" "logo sub sub";
`;

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
const Subscribers = styled.p`
    grid-area: sub;
`;

const Button = styled.div`
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};

    cursor: pointer;
    border: none;
    outline: none;
    font-size: 0.8rem;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;

    padding: 10px 20px;
`;

const LeftDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;
const RightDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const LikeUnlike = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.bgLighter};

    border-radius: 30px;
`;

const HrLine = styled.div`
    border: 1px solid #8c8989;
    height: 30px;
`;

const BigVideoDetails = () => {
    return (
        <VideoDetails>
            <LeftDiv>
                <ChannelDetails>
                    <ChannelLogo />
                    <ChannelName>{}</ChannelName>
                    <Subscribers>1k subscribers</Subscribers>
                </ChannelDetails>
                <Button>Join</Button>
                <Button>Subscribe</Button>
                <NotificationAdd />
            </LeftDiv>

            <RightDiv>
                <LikeUnlike>
                    <Button>
                        <ThumbUp />
                        {"1k"}
                    </Button>
                    <HrLine />
                    <Button>
                        <ThumbDown />
                    </Button>
                </LikeUnlike>
                <Button>
                    <Share />
                    Share
                </Button>
                <Button>
                    <FavoriteOutlined />
                    Thanks
                </Button>
            </RightDiv>
        </VideoDetails>
    );
};

export default BigVideoDetails;
