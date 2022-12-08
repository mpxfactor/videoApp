import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "../config";
import {
    fetchUsers,
    getPostUserErrors,
    getPostUserStatus,
    loginFailure,
    loginStart,
    loginSuccess,
    selectUser,
} from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";

const Container = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 10px;
    justify-content: flex-start;
    align-items: center;
`;

const WrapperSignin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
    border-radius: 15px;

    background: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
`;
const WrapperSignUp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
    border-radius: 15px;

    background: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    max-width: 400px;
    border-radius: 15px;

    /* @media (min-width: 641px) {
        width: 500px;
    }
    @media (min-width: 961px) {
        width: 500px;
    } */
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

const ButtonSignin = styled.button`
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
const ButtonSignup = styled.button`
    padding: 5px;
    font-size: 1rem;
    width: 100px;
    border-radius: 5px;
    border: none;

    pointer-events: ${({ submit }) => (submit ? "none" : "")};
    cursor: ${({ submit }) => (submit ? "not-allowed" : "pointer")};

    &:active {
        background-color: #4fff7e;
        box-shadow: 0 1px #666;
        transform: translateY(4px);
    }

    /* display: flex; */
    position: relative;

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

const Text = styled.p`
    font-size: 1rem;
    width: 100%;
    text-align: center;
`;

const GoogleSignUp = styled.button`
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

const Signin = () => {
    const navigate = useNavigate();

    const [googleSubmit, setGoogleSubmit] = useState(false);
    const [signinSubmit, setSigninSubmit] = useState(false);
    // const [signupSubmit, setSignupSubmit] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setGoogleSubmit(false);
        }, 5000);
    }, [googleSubmit]);
    useEffect(() => {
        setTimeout(() => {
            setSigninSubmit(false);
        }, 5000);
    }, [signinSubmit]);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSignupSubmit(false);
    //     }, 5000);
    // }, [signupSubmit]);

    const [signinEmail, setSigninEmail] = useState("");
    const [signinPassword, setSigninPassword] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    ///////////////////////////////////////////////////////////////
    const dispatch = useDispatch();

    const users = useSelector(selectUser);
    const usersStatus = useSelector(getPostUserStatus);
    const error = useSelector(getPostUserErrors);
    ///////////////////////////////////////////////////////////////

    // const handleSignUpClick = async (event) => {
    //     event.preventDefault();
    //     if (usersStatus === "idle") {
    //         const user = { name, email, password };
    //         disptach(fetchUsers(user));
    //     }
    //     setName("");
    //     setEmail("");
    //     setPassword("");
    // };
    const handleSignInClick = async (event) => {
        event.preventDefault();
        setSigninSubmit(!signinSubmit);
        dispatch(loginStart());
        try {
            const res = await axiosInstance.post(
                "/auth/signin",
                { email: signinEmail, password: signinPassword },
                {
                    //AxiosRequestConfig parameter
                    withCredentials: true, //correct
                }
            );
            dispatch(loginSuccess(res.data));
            setSigninEmail("");
            setSigninPassword("");
            navigate("/");
        } catch (err) {
            dispatch(loginFailure());
        }
    };

    ////////////////////////////////////////////////////////////////////
    const signInWithGoogle = async (event) => {
        event.preventDefault();
        setGoogleSubmit(!googleSubmit);
        dispatch(loginStart());
        await signInWithPopup(auth, provider)
            .then((result) => {
                axiosInstance
                    .post(
                        "/auth/google",
                        {
                            name: result.user.displayName,
                            email: result.user.email,
                            img: result.user.photoURL,
                        },
                        {
                            //AxiosRequestConfig parameter
                            withCredentials: true, //correct
                        }
                    )
                    .then((res) => {
                        dispatch(loginSuccess(res.data));
                    })
                    .then(navigate("/"));
            })
            .catch((err) => {
                dispatch(loginFailure());
            });
    };

    /////////////////////////////////////////////////////////////////////

    return (
        <Container>
            <WrapperSignin>
                <Text>SignIn</Text>
                <Form>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={signinEmail}
                        onChange={(event) => setSigninEmail(event.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={signinPassword}
                        onChange={(event) =>
                            setSigninPassword(event.target.value)
                        }
                    />
                    <ButtonSignin
                        type="button"
                        onClick={handleSignInClick}
                        submit={signinSubmit}
                    >
                        Signin
                    </ButtonSignin>
                </Form>
            </WrapperSignin>
            <WrapperSignUp>
                {/* <Text>SignUp</Text>
                <Form>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Input type="password" placeholder="ReEnter Password" />
                    <ButtonSignup type="button" onClick={handleSignUpClick}>
                        Signup
                    </ButtonSignup>
                </Form>*/}
                {/* <Text>or</Text> */}
                <GoogleSignUp
                    type="button"
                    onClick={signInWithGoogle}
                    submit={googleSubmit}
                >
                    <Text>Sign In with Google</Text>
                </GoogleSignUp>
            </WrapperSignUp>
        </Container>
    );
};

export default Signin;
