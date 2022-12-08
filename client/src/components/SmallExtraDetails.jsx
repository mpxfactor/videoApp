// import axios from "axios";
import { axiosInstance } from "../config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser, subscription } from "../redux/userSlice";

const ExtraDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;

    display: ${({ expand }) => (expand ? "none" : "flex")};
`;

const ChannelName = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: baseline;
    font-size: 1rem;
    font-weight: 500;
`;

const SubCount = styled.p`
    font-size: 0.7rem;
    font-weight: 600;
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
    border-radius: 50%;
    border: none;
    width: 100%;
    height: 100%;
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

const SmallExtraDetails = ({ channel, expand }) => {
    const currentUser = useSelector(selectUser);

    const dispatch = useDispatch();

    const handleSubscribe = async () => {
        try {
            currentUser.subscribedChannel.includes(channel._id)
                ? await axiosInstance.put(
                      `/users/unsub/${channel._id}`,
                      {},
                      { withCredentials: true }
                  )
                : await axiosInstance.put(
                      `/users/sub/${channel._id}`,
                      {},
                      { withCredentials: true }
                  );
            dispatch(subscription(channel._id));
            // console.log("clicked");
        } catch (err) {}
    };
    return (
        <ExtraDetails expand={expand}>
            <ImgDiv>
                <ChannelLogo src={channel.img} />
            </ImgDiv>
            <ChannelName>
                {channel.name}
                <SubCount> {channel.subscribers} subscribers</SubCount>
            </ChannelName>
            <Button
                style={{ alignSelf: "flex-end", margin: "0 0 0 auto" }}
                onClick={
                    currentUser === null
                        ? () => console.log("Signin to Subscribe")
                        : handleSubscribe
                }
            >
                {(currentUser &&
                    (currentUser.subscribedChannel?.includes(channel._id)
                        ? "SUBSCRIBED"
                        : "SUBSCRIBE")) ||
                    "SUBSCRIBE"}
            </Button>
        </ExtraDetails>
    );
};

export default SmallExtraDetails;
