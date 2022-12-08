// import axios from "axios";
import { axiosInstance } from "../config";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";

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

    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
`;

const Search = ({ type }) => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axiosInstance.get(`/videos/search${query}`);
                setVideos(res.data);
            } catch (err) {}
        };
        fetchVideos();
    }, [query]);
    return (
        <Container>
            {videos
                ? videos.map((video) => <Card key={video._id} video={video} />)
                : "loading"}
        </Container>
    );
};

export default Search;
