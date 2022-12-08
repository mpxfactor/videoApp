import React, { useState } from "react";
import styled from "styled-components";
import {
    Comment,
    FavoriteOutlined,
    PlaylistAdd,
    Share,
    ThumbDown,
    ThumbDownOutlined,
    ThumbUp,
    ThumbUpAltOutlined,
} from "@mui/icons-material";
// import axios from "axios";
import { axiosInstance } from "../config";
import { dislike, like, selectVideo } from "../redux/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, subscription } from "../redux/userSlice";
//////////////////////////////////////////////////////////////////
import { RWebShare } from "react-web-share";
import { useLocation } from "react-router-dom";
///////////////////////////////////////////////////////////////////

const VideoDetails = styled.div`
    margin: 7px 0;
    min-height: 50px;

    display: ${({ expand }) => (expand ? "none" : "flex")};

    gap: 5px;
    align-items: center;

    max-width: 350px;
    flex-wrap: no-wrap;
    overflow-x: auto;

    align-self: center;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 641px) {
        max-width: 100%;
        flex-wrap: no-wrap;
        align-self: flex-start;
        /* overflow-x: auto; */
    }
`;

const Button = styled.div`
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};

    cursor: pointer;
    border: none;
    outline: none;
    font-size: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;

    padding: 10px 20px;
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

const Count = styled.p`
    margin-left: 5px;
`;

const SmallVideoDetatils = ({ channel, handleExpand, expand }) => {
    const dispatch = useDispatch();
    const currentVideo = useSelector(selectVideo);
    const currentUser = useSelector(selectUser);

    const handleLike = async () => {
        try {
            await axiosInstance.put(
                `/users/like/${currentVideo._id}`,
                {},
                { withCredentials: true }
            );
            dispatch(like(currentUser._id));
        } catch (err) {}
    };
    const handleDislike = async () => {
        try {
            await axiosInstance.put(
                `/users/dislike/${currentVideo._id}`,
                {},
                { withCredentials: true }
            );
            dispatch(dislike(currentUser._id));
        } catch (err) {}
    };

    const link = useLocation().pathname;
    const title = currentVideo.title;
    // console.log(title);

    return (
        <VideoDetails expand={expand}>
            <LikeUnlike>
                <Button
                    onClick={
                        currentUser === null
                            ? () => console.log("Signin to Like")
                            : handleLike
                    }
                >
                    {(currentUser &&
                        (currentVideo.likes?.includes(currentUser._id) ? (
                            <ThumbUp
                                style={{
                                    fontSize: "16px",
                                    cursor: "pointer",
                                }}
                            />
                        ) : (
                            <ThumbUpAltOutlined
                                style={{
                                    fontSize: "16px",
                                    cursor: "pointer",
                                }}
                            />
                        ))) || (
                        <ThumbUpAltOutlined style={{ fontSize: "16px" }} />
                    )}
                    <Count>{currentVideo.likes.length}</Count>
                </Button>
                {/* /////////////////////////////////////////////////////////////////////////////// */}
                <HrLine />
                <Button
                    onClick={
                        currentUser === null
                            ? () => console.log("Signin to Dislike")
                            : handleDislike
                    }
                >
                    {(currentUser &&
                        (currentVideo.dislikes?.includes(currentUser._id) ? (
                            <ThumbDown
                                style={{
                                    fontSize: "16px",
                                    cursor: "pointer",
                                }}
                            />
                        ) : (
                            <ThumbDownOutlined
                                style={{
                                    fontSize: "16px",
                                    cursor: "pointer",
                                }}
                            />
                        ))) || (
                        <ThumbDownOutlined
                            style={{
                                fontSize: "16px",
                            }}
                        />
                    )}
                </Button>
            </LikeUnlike>
            {/* //////////////////////////////////////////////////////////////////// */}
            <Button onClick={handleExpand} expand={expand}>
                <Comment />
                Comment
            </Button>
            {/* //////////////////////////////////////////////////////////////////// */}
            <RWebShare
                data={{
                    text: `${title}`,
                    url: `https://mpxfacor-youtube-test-1.herokuapp.com${link}`,
                    title: "MPXtube",
                }}
                closeText="hello"
            >
                <Button>
                    <Share />
                    Share
                </Button>
            </RWebShare>
            {/* //////////////////////////////////////////////// */}

            {/* <Button>
                <Share />
                Share
            </Button> */}

            {/* //////////////////////////////////////////////// */}
            <Button>
                <FavoriteOutlined />
                Thanks
            </Button>
            <Button>
                <PlaylistAdd />
                Playlist
            </Button>
        </VideoDetails>
    );
};

export default SmallVideoDetatils;
