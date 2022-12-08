// import axios from "axios";
import { axiosInstance } from "../config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import BigRecommendationCard from "../components/BigRecommendationCard";
import BigVideoCard from "../components/BigVideoCard";
import SmallRecommendationCard from "../components/SmallRecommendationCard";
import SmallVideoCard from "../components/SmallVideoCard";
import {
    fetchFailure,
    fetchStart,
    fetchSuccess,
    fetchVideos,
    getPostErrors,
    getPostStatus,
    selectVideo,
} from "../redux/videoSlice";
import SmallRecommendationVideos from "../components/SmallRecommendationVideos";
import Loading from "../components/Loading";
// import Recommendation from "../components/Recommendation";

const Container = styled.div`
    grid-area: main;

    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};

    /* padding-top: 8px; */
    padding-bottom: 50px;
    /* padding-left: 10px;
    padding-right: 10px; */

    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas: "video video video recommend";
    }
`;

const VideoContainer = styled.div`
    position: sticky;
    top: 60px;
    background-color: black;
`;

const Recommendation = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
    justify-items: center;
    @media (min-width: 961px) {
        display: block;
        /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;
        justify-items: center; */
    }
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

const Video = () => {
    // const useLocationHook = useLocation();
    // const path = useLocationHook.pathname.split("/")[2];

    // const video = useSelector(selectVideo);
    // const [videos, setVideos] = useState([]);

    // useEffect(() => {
    //     const fetchVideos = async () => {
    //         try {
    //             const res = await axiosInstance.get(
    //                 `/videos/tags?tags=${"" && video.tags}`
    //             );
    //             setVideos(res.data);
    //         } catch (err) {
    //             // alert("please reload the page");
    //             console.log("error");
    //         }
    //     };
    //     fetchVideos();
    // }, [video, path]);
    //////////////////////////////////////////////////////////////////////////////

    const dispatch = useDispatch();
    const useLocationHook = useLocation();
    const path = useLocationHook.pathname.split("/")[2];

    const videos = useSelector(selectVideo);
    const videoStatus = useSelector(getPostStatus);
    const error = useSelector(getPostErrors);

    const [channel, setChannel] = useState("");

    useEffect(() => {
        // const fetchUser = () =>
        // async () => {
        const fetchData = async () => {
            dispatch(fetchStart());
            try {
                const videoRes = await axiosInstance.get(
                    `/videos/find/${path}`
                );
                await axiosInstance.put(`/videos/view/${path}`);
                const channelRes = await axiosInstance.get(
                    `/users/find/${videoRes.data.userId}`
                );

                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
            } catch (err) {
                dispatch(fetchFailure());
            }
        };

        fetchData();
    }, [path, dispatch]);

    /////////////////////////////////////////////////////////////////////////
    let width = window.innerWidth;

    /////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////

    return videos._id === path ? (
        <Container>
            {width > 961 ? (
                <>
                    <BigVideoCard>video</BigVideoCard>
                </>
            ) : (
                <VideoContainer>
                    <SmallVideoCard
                        videos={videos}
                        channel={channel}
                        videoStatus={videoStatus}
                    />
                </VideoContainer>
            )}

            <Recommendation>
                {window.innerWidth <= 961 ? (
                    <>
                        <SmallRecommendationVideos tags={videos.tags} />
                    </>
                ) : (
                    <>
                        <BigRecommendationCard />
                    </>
                )}
            </Recommendation>
            {/* <Card /> */}
        </Container>
    ) : (
        <Loading />
    );
};

export default Video;
