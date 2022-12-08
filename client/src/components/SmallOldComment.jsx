import { useSelect } from "@mui/base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { axiosInstance } from "../config";
import { fetchComments, selectComment } from "../redux/commentSlice";
import { selectUser } from "../redux/userSlice";
import { selectVideo } from "../redux/videoSlice";

const OldComments = styled.div`
    display: grid;
    grid-template-columns: 60px repeat(4, 1fr);
    grid-template-areas: "logo comment comment comment comment";
    margin-bottom: 10px;
`;

const Text = styled.p``;

const CommentChannel = styled.p`
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 5px;
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

const CommentChannelLogo = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
`;

const Div = styled.div`
    grid-area: comment;
`;

const SmallOldComment = ({ comment }) => {
    const [channel, setChannel] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get(
                    `/users/find/${comment.userId}`
                );
                setChannel(res.data);
            } catch (err) {}
        };
        fetchUser();
    }, [comment.userId]);

    return (
        <OldComments>
            <ImgDiv>
                <CommentChannelLogo src={channel.img} />
            </ImgDiv>
            <Div>
                <CommentChannel>{channel.name}</CommentChannel>
                <Text>{comment.desc}</Text>
            </Div>
        </OldComments>
    );
};

export default SmallOldComment;
