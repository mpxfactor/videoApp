// import axios from "axios";
import { axiosInstance } from "../config";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Loading from "../components/Loading";
import NotSubscribedPage from "../components/NotSubscribedPage";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import SignInToWatchSub from "../components/SignInToWatchSub";

const Container = styled.div`
    grid-area: main;

    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};

    padding-top: 8px;
    padding-bottom: 50px;
    /* padding-left: 10px;
    padding-right: 10px; */

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
    justify-items: center;
    height: max-content;

    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
`;

const Home = ({ type }) => {
    const [videos, setVideos] = useState([]);
    const currentUser = useSelector(selectUser);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axiosInstance.get(`/videos/${type}`, {
                    withCredentials: true,
                });
                setVideos(res.data);
            } catch (err) {
                // alert("please reload the page");
                // console.log("error");
            }
        };
        fetchVideos();
    }, [type]);
    return videos.length !== 0 ? (
        <Container>
            {videos.map((video) => (
                <Card key={video._id} video={video} />
            ))}
        </Container>
    ) : (
        (type === "sub" &&
            videos.length === 0 &&
            (currentUser._id ? (
                <NotSubscribedPage />
            ) : (
                <SignInToWatchSub />
            ))) || <Loading />
    );
};

export default Home;
