import { Close } from "@mui/icons-material";
// import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { clearResults } from "../redux/userSlice";
import { axiosInstance } from "../config";
import { useNavigate } from "react-router-dom";

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

const Button = styled.button`
    pointer-events: ${({ submit }) => (submit ? "none" : "")};
    cursor: ${({ submit }) => (submit ? "not-allowed" : "pointer")};

    &:active {
        background-color: #d71d1d;
        transform: translateY(4px);
    }

    padding: 5px;
    font-size: 1rem;
    width: 250px;
    border-radius: 5px;
    border: none;
`;

const Logout = ({ handleLogout }) => {
    const dispatch = useDispatch();
    const logout = async (event) => {
        dispatch(clearResults());
        try {
            await axiosInstance.get("/auth/signout", { withCredentials: true });
            handleLogout();
        } catch (error) {
            console.log(error.message);
        }
    };

    const navigate = useNavigate();

    return (
        <Container onClick={handleLogout}>
            <Wrapper>
                <Close
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        cursor: "pointer",
                    }}
                />
                <Button onClick={logout}>Logout</Button>
                <Button onClick={() => navigate("upload_avatar")}>
                    Change Avatar
                </Button>
            </Wrapper>
        </Container>
    );
};

export default Logout;
