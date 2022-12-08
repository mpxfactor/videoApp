import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../config";
import { selectVideo } from "../redux/videoSlice";
import SmallRecommendationCard from "./SmallRecommendationCard";

const SmallRecommendationVideos = ({ tags }) => {
    const currentVideo = useSelector(selectVideo);
    const [recommVideos, setRecommVideos] = useState([]);

    useEffect(() => {
        const fetchRecommVideos = async () => {
            const res = await axiosInstance.get(`/videos/tags?tags=${tags}`);
            setRecommVideos(res.data);
        };
        fetchRecommVideos();
    }, [tags]);

    const finalRecommVideos = recommVideos.filter(
        (recommVideo) => recommVideo._id !== currentVideo._id
    );

    return finalRecommVideos.map((video) => (
        <SmallRecommendationCard key={video._id} video={video} type="sm" />
    ));
};

export default SmallRecommendationVideos;
