import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
    fetchTheVideo,
    fetchVideos,
    getPostErrors,
    getPostStatus,
    selectVideo,
} from "../redux/videoSlice";
import BigComments from "./BigComments";
import BigVideoDesc from "./BigVideoDesc";
import BigVideoDetails from "./BigVideoDetails";

const Container = styled.div`
    /* background-color: #4e4e4e; */

    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        grid-area: video;
        width: 900px;
        height: 100%;
        margin: 0;
        justify-self: center;
    }
`;

const VideoPlay = styled.video`
    width: 900px;
    height: 450px;
    background: red;
    margin-bottom: 10px;
    object-fit: cover;
`;

const Title = styled.h1`
    padding: 10px;
    font-size: 1.5rem;
    font-weight: 600;
`;

const BigVideoCard = () => {
    // const disptach = useDispatch();

    // const videos = useSelector(selectVideo);
    // const videoStatus = useSelector(getPostStatus);
    // const error = useSelector(getPostErrors);

    // const string = "jlasdkjf;s";

    // useEffect(() => {
    //     if (videoStatus === "idle") {
    //         disptach(fetchVideos(string));
    //     }
    // }, [videoStatus, disptach]);

    // if (videoStatus === "loading") {
    //     console.log("loading");
    // } else if (videoStatus === "succeeded") {
    //     console.log(videos);
    // } else if (videoStatus === "failed") {
    //     console.log("failed");
    // }
    /////////////////////////////////////////////////////////////////
    // const handleLike = async () => {
    //     try {
    //         await axios.put(
    //             `/users/like/${currentVideo._id}`,
    //             {},
    //             { withCredentials: true }
    //         );
    //         dispatch(like(currentUser._id));
    //     } catch (err) {}
    // };
    // const handleDislike = async () => {
    //     try {
    //         await axios.put(
    //             `/users/dislike/${currentVideo._id}`,
    //             {},
    //             { withCredentials: true }
    //         );
    //         dispatch(dislike(currentUser._id));
    //     } catch (err) {}
    // };

    // const handleSubscribe = async () => {
    //     try {
    //         currentUser.subscribedChannel.includes(channel._id)
    //             ? await axios.put(
    //                   `/users/unsub/${channel._id}`,
    //                   {},
    //                   { withCredentials: true }
    //               )
    //             : await axios.put(
    //                   `/users/sub/${channel._id}`,
    //                   {},
    //                   { withCredentials: true }
    //               );
    //         dispatch(subscription(channel._id));
    //     } catch (err) {}
    // };
    /////////////////////////////////////////////////////////////////

    return (
        <Container>
            <VideoPlay controls />
            {/* {videoStatus === "succeeded" && (
                <VideoPlay src={videos.videoUrl} controls />
            )}
            {videoStatus === "succeeded" && <Title>{videos.title}</Title>}
            {videoStatus === "succeeded" && <BigVideoDetails />} */}
            <Title>{}</Title>
            <BigVideoDetails />
            <BigVideoDesc />
            <BigComments />
        </Container>
    );
};

export default BigVideoCard;
