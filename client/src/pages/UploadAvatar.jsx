import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useNavigation } from "react-router-dom";
import { storage } from "../utils/firebase";
import { axiosInstance } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { clearResults, selectUser } from "../redux/userSlice";

const Container = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 10px;
    justify-content: flex-start;
    align-items: center;
`;

const Title = styled.h1``;

const Guide = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
`;

const Text = styled.p`
    font-size: 1rem;
    text-align: center;
`;

const Button = styled.button`
    padding: 5px;
    font-size: 1rem;
    width: 100px;
    border-radius: 5px;
    border: none;

    pointer-events: ${({ submit }) => (submit ? "none" : "")};
    cursor: ${({ submit }) => (submit ? "not-allowed" : "pointer")};

    /* display: flex; */
    position: relative;

    padding: 5px;
    font-size: 1rem;
    width: 250px;
    border-radius: 5px;
    border: none;

    &:active {
        background-color: #4fff7e;
        box-shadow: 0 1px #666;
        transform: translateY(4px);
    }

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

const UploadAvatar = () => {
    const dispatch = useDispatch();
    /////////////////////////////////////////////////////
    const users = useSelector(selectUser);
    const navigate = useNavigate();

    /////////////////////////////////////////////////////
    // const [submit, setSubmit] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSubmit(false);
    //     }, 4000);
    // }, [submit]);

    ///////////////////////////////////////////////////////////////
    const [img, setImg] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [inputs, setInputs] = useState({});

    // const handleChange = (e) => {
    //     setInputs((prev) => {
    //         return { ...prev, [e.target.name]: e.target.value };
    //     });
    // };

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

                setImgPerc(progress);
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
                        return { [urlType]: downloadURL };
                    });
                });
            }
        );
    };

    useEffect(() => {
        img && uploadFile(img, "img");
    }, [img]);

    //////////////////////////////////////////////////////////////////

    const logout = async (event) => {
        dispatch(clearResults());
        try {
            await axiosInstance.get("/auth/signout", { withCredentials: true });
            // handleLogout();
        } catch (error) {
            console.log(error.message);
        }
    };
    //////////////////////////////////////////////////////////////////////////
    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.put(
                `users/photo/${users._id}`,
                {
                    ...inputs,
                },
                {
                    withCredentials: true,
                }
            );
            res.status === 200 && navigate("/");

            setTimeout(() => logout(), 2000);

            // setTimeout(() => {
            //     handleCloseUpload();
            // }, 5000);
            // window.location.reload();
        } catch (err) {
            // console.log(err.message);
        }
    };

    ///////////////////////////////////////////////////////////////

    return (
        <Container>
            <Title>Upload New Avatar</Title>
            <Guide>
                <Text>To Upload New Avatar</Text>
                <Text>
                    GoTo -{" "}
                    <a
                        href="https://bigheads.io/editor"
                        style={{ color: "inherit" }}
                        target="_blank"
                    >
                        https://bigheads.io/editor
                    </a>
                </Text>
                <Text>Create your own avatar download and upload here</Text>
            </Guide>
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
                // submit={submit}
                onClick={handleUpload}
            >
                Upload
            </Button>
        </Container>
    );
};

export default UploadAvatar;
