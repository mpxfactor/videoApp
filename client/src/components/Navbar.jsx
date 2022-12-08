import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import {
    ArrowBack,
    Close,
    NotificationsOutlined,
    Person,
    SearchOutlined,
    VideoCallOutlined,
    YouTube,
} from "@mui/icons-material";

import YLogo from "../images/youtubelogo.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddNewVideo from "./AddNewVideo";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import BlankPageForSearchClose from "./BlankPageForSearchClose";

const Container = styled.div`
    grid-area: navbar;

    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};

    position: sticky;
    top: 0px;

    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        &::after {
            content: "";
            width: 99.5%;
            height: 0;
            position: absolute;
            border: 1px solid #373636;
            left: 0px;
            top: 58px;
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 5px;
    /* padding: 10px; */
    @media (min-width: 641px) {
        margin: 0;
    }
`;

const MenuDivOpen = styled.div`
    display: ${({ close }) => (close ? "block" : "none")};
    @media (min-width: 961px) {
        display: none;
    }
`;
const MenuDivClose = styled.div`
    display: ${({ close }) => (!close ? "block" : "none")};
    @media (min-width: 961px) {
        display: none;
    }
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    margin-left: 10px;
`;

const MainLogo = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
`;

const YoutubeLogo = styled.img`
    filter: opacity(0.5) drop-shadow(0 0 0 blue);
    width: 20px;
    height: 20px;
`;
const Text = styled.h1`
    font-weight: 400;
    font-size: 1.3rem;
    letter-spacing: -1px;
`;

const SearchDiv = styled.div`
    display: none;
    @media (min-width: 641px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
        margin: 5px 0;
        background-color: ${({ theme }) => theme.bgLighter};
        border-radius: 1.5rem;
    }
`;

const Input = styled.input`
    border: none;
    width: 90%;
    color: ${({ theme }) => theme.text};
    background-color: transparent;
    outline: none;
    padding: 0 5px;
`;

const SerachDivMobile = styled.div`
    display: block;
    @media (min-width: 641px) {
        display: none;
    }
`;

const MobileSearch = styled.div`
    width: 100%;
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    background-color: ${({ theme }) => theme.bgLighter};
    border-radius: 1.5rem;

    @media (min-width: 641px) {
        display: none;
    }
`;

const User = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    gap: 1.2rem;
`;

const ImgDiv = styled.div`
    border-radius: 50%;
    background-color: #aa5cc6;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
`;

const Avatar = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
`;

// const Avatar = styled.img`
//     border-radius: 50%;
//     background-color: #aa5cc6;
//     width: 30px;
//     height: 30px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;

//     position: relative;
// `;

const Notification = styled.div`
    position: relative;
`;

const NotificationCount = styled.div`
    border-radius: 50%;
    background-color: red;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    top: 0;
    right: 0;
    font-size: 8px;
    font-weight: 900;

    position: absolute;
`;

const Button = styled.button`
    background: transparent;
    border: 1px solid #3ea6ff;
    padding: 5px;
    font-size: 10px;
    margin: 10px 0;
    color: #3ea6ff;

    display: flex;
    align-items: center;

    cursor: pointer;
`;

const Navbar = ({
    handleMenuClose,
    handleCloseUpload,
    closeUpload,
    setClose,
    close,
}) => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [q, setQ] = useState("");

    ////////////////////////////////////
    ////////////////////////////////////

    const [openSearch, setOpenSearch] = useState(false);
    const handleSearchClick = () => {
        setBackClick(!backClick);
        navigate(`/search?q=${q}`);
    };

    const [backClick, setBackClick] = useState(true);
    const handleBackClick = () => {
        setBackClick(!backClick);
    };

    const [logout, setLogout] = useState(false);

    const handleLogout = () => {
        setLogout(!logout);
    };

    // console.log(close);

    return (
        <>
            <Container>
                {backClick ? (
                    <Wrapper>
                        <Logo>
                            <MenuDivOpen close={close}>
                                <MenuIcon
                                    style={{
                                        marginRight: "10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleMenuClose}
                                />
                            </MenuDivOpen>
                            <MenuDivClose close={close}>
                                <Close
                                    style={{
                                        marginRight: "10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setClose(true)}
                                />
                            </MenuDivClose>
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                onClick={() =>
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 100)
                                }
                            >
                                <MainLogo>
                                    <YouTube style={{ color: "red" }} />
                                    <Text>WhyTube?</Text>
                                </MainLogo>
                            </Link>
                        </Logo>
                        <SearchDiv>
                            <Input placeholder="Search" />
                            <SearchOutlined
                                style={{ cursor: "pointer" }}
                                onClick={handleSearchClick}
                            />
                        </SearchDiv>
                        <User>
                            <SerachDivMobile>
                                <SearchOutlined
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "1.7rem",
                                    }}
                                    onClick={handleBackClick}
                                />
                            </SerachDivMobile>

                            {user._id ? (
                                <>
                                    {/* <VideoCallOutlined
                                        onClick={handleCloseUpload}
                                        style={{
                                            fontSize: "2rem",
                                            cursor: "pointer",
                                        }}
                                    />
                                    <Notification>
                                        <NotificationsOutlined
                                            style={{
                                                fontSize: "2rem",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <NotificationCount>
                                            10+
                                        </NotificationCount>
                                    </Notification> */}
                                    <ImgDiv>
                                        <Avatar
                                            onClick={handleLogout}
                                            src={user.img}
                                        />
                                    </ImgDiv>
                                </>
                            ) : (
                                <Link
                                    to="signin"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button>
                                        <Person style={{ fontSize: "15px" }} />
                                        SIGN IN
                                    </Button>
                                </Link>
                            )}
                        </User>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <MobileSearch>
                            <ArrowBack
                                style={{ fontSize: "2rem", cursor: "pointer" }}
                                onClick={handleBackClick}
                            />
                            <Input
                                placeholder="Search"
                                onChange={(event) => setQ(event.target.value)}
                            />
                            <SearchOutlined
                                style={{ fontSize: "2rem", cursor: "pointer" }}
                                onClick={handleSearchClick}
                            />
                        </MobileSearch>
                    </Wrapper>
                )}
            </Container>
            {logout && <Logout handleLogout={handleLogout} />}
            {closeUpload && (
                <AddNewVideo handleCloseUpload={handleCloseUpload} />
            )}
            {!backClick && (
                <BlankPageForSearchClose handleBackClick={handleBackClick} />
            )}
        </>
    );
};

export default Navbar;
