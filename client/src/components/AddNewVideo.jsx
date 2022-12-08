import { Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {
//     getStorage,
//     ref,
//     uploadBytesResumable,
//     getDownloadURL,
// } from "firebase/storage";
// import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import { storage } from "../utils/firebase";
import { axiosInstance } from "../config";

const Container = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #000000ae;
    width: 100%;
    height: 100%;

    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    padding: 30px;

    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    position: relative;
`;

const Title = styled.h1``;

const Input = styled.input`
    font-size: 0.9rem;
    padding: 5px;
    outline: none;
    border: 1px solid #5e5b5b;
    width: 100%;
    border-radius: 5px;

    color: ${({ theme }) => theme.text};
    background-color: transparent;
`;

const Description = styled.textarea`
    font-size: 0.9rem;
    padding: 5px;
    outline: none;
    border: 1px solid #5e5b5b;
    width: 100%;
    border-radius: 5px;
    color: ${({ theme }) => theme.text};
    background-color: transparent;
    resize: none;
`;

const Button = styled.button`
    pointer-events: ${({ submit }) => (submit ? "none" : "")};
    cursor: ${({ submit }) => (submit ? "not-allowed" : "pointer")};

    &:active {
        background-color: #4fff7e;
        box-shadow: 0 1px #666;
        transform: translateY(4px);
    }

    /* display: flex; */
    position: relative;

    padding: 5px;
    font-size: 1rem;
    width: 250px;
    border-radius: 5px;
    border: none;

    &::before {
        position: absolute;
        right: 10px;
        content: "";
        width: 20px;
        height: 20px;
        border: 2px solid black;
        border-left-color: transparent;
        border-right-color: transparent;
        border-radius: 50%;
        opacity: ${({ submit }) => (submit ? "1" : "0")};
        transition: opacity 0.5s;
        transition-delay: 0.5s;
        transition-duration: 1s;
        animation: 0.8s linear infinite rotate;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const AddNewVideo = ({ handleCloseUpload }) => {
    // const [submit, setSubmit] = useState(false);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSubmit(false);
    //     }, 5000);
    // }, [submit]);
    /////////////////////////////////////////////////////////////////////////////////////////
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleTags = (event) => {
        setTags(event.target.value.split(","));
    };

    const uploadFile = (file, urlType) => {
        // const storage = getStorage();
        const fileName = new Date().getTime() + file.name;

        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                urlType === "imgUrl"
                    ? setImgPerc(progress)
                    : setVideoPerc(progress);
                switch (snapshot.state) {
                    case "paused":
                        // console.log("Upload is paused");
                        break;
                    case "running":
                        // console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {},
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );
    };

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        img && uploadFile(img, "imgUrl");
    }, [img]);
    ///////////////////////////////////////////////////
    // const refreshPage = () => {
    //     window.location.reload();
    // };
    ////////////////////////////////////////////////////
    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post(
                "/videos",
                {
                    ...inputs,
                    tags,
                },
                {
                    withCredentials: true,
                }
            );
            res.status === 200 && navigate(`video/${res.data._id}`);

            setTimeout(() => {
                handleCloseUpload();
            }, 5000);
            // window.location.reload();
        } catch (err) {}
    };

    /////////////////////////////////////////////////////////////////////////////////////
    return (
        <Container>
            <Wrapper>
                <Close
                    onClick={handleCloseUpload}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "5px",
                        cursor: "pointer",
                    }}
                />
                <Title>Upload New Video</Title>
                {videoPerc > 0 ? (
                    "Uploading " + videoPerc + "%"
                ) : (
                    <Input
                        placeholder=""
                        type="file"
                        accept="video/*"
                        style={{ cursor: "pointer" }}
                        onChange={(event) => setVideo(event.target.files[0])}
                    />
                )}
                <Input
                    placeholder="Title"
                    type="text"
                    name="title"
                    onChange={handleChange}
                />
                <Description
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Description"
                    onChange={handleChange}
                ></Description>
                <Input
                    placeholder="Separate tags with commas"
                    onChange={handleTags}
                />
                {imgPerc > 0 ? (
                    "Uploading Image " + imgPerc + "%"
                ) : (
                    <Input
                        placeholder=""
                        type="file"
                        accept="image/*"
                        style={{ cursor: "pointer" }}
                        onChange={(event) => setImg(event.target.files[0])}
                    />
                )}
                <Button
                    type="button"
                    onClick={handleUpload}
                    // onClick={(event) => {
                    //     event.preventDefault();
                    //     setSubmit(!submit);
                    // }}
                    // submit={submit}
                >
                    Submit
                </Button>
            </Wrapper>
        </Container>
    );
};

export default AddNewVideo;
