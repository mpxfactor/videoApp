import styled from "styled-components";
import {
    Explore,
    Help,
    History,
    Home,
    LibraryMusic,
    LiveTv,
    LocalMovies,
    Newspaper,
    Person,
    ReportGmailerrorred,
    Settings,
    SportsBasketball,
    SportsEsports,
    Subscriptions,
    VideoLibrary,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const Container = styled.div`
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};

    width: 250px;
    height: 100vh;

    padding-bottom: 200px;

    position: fixed;
    overflow-y: auto;
    top: 50px;

    display: block;

    left: 0;
    transform: ${({ close }) =>
        close ? `translateX(-100%)` : `translateX(0)`};

    transition: 500ms;

    z-index: 1;

    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        background: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.text};
        grid-area: menu;
        position: sticky;
        top: 50px;
        transform: translate(0);
    }
`;

///////////////////////////////////////////////////////////////
const BlankClosePage = styled.div`
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #00000091;
`;
///////////////////////////////////////////////////////////////

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 5px 0;

    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.bgLighter};
    }
`;

const Hr = styled.hr`
    margin: 5px 0px;
    border: 1px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
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

// const Text = styled.p`
//     font-size: 2rem;
//     font-weight: 500;
// `;

const Menu = ({ close, handleMenuClose, setClose }) => {
    const user = useSelector(selectUser);

    return (
        <>
            <Container close={close}>
                <Wrapper>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleMenuClose}
                    >
                        <Item>
                            <Home style={{ fontSize: "20px" }} />
                            Home
                        </Item>
                    </Link>
                    <Link
                        to="trends"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleMenuClose}
                    >
                        <Item>
                            <Explore style={{ fontSize: "20px" }} />
                            Explore
                        </Item>
                    </Link>
                    <Link
                        to="subscriptions"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleMenuClose}
                    >
                        <Item>
                            <Subscriptions style={{ fontSize: "20px" }} />
                            Subscriptions
                        </Item>
                    </Link>
                    <Hr />
                    <Item>
                        <VideoLibrary style={{ fontSize: "20px" }} />
                        Library
                    </Item>
                    <Item>
                        <History style={{ fontSize: "20px" }} />
                        History
                    </Item>
                    <Hr />
                    {!user._id && (
                        <>
                            <Login>
                                <p>
                                    Sign in to like videos, comment and
                                    subscribe.
                                </p>
                                <Link
                                    to="signin"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button>
                                        <Person style={{ fontSize: "15px" }} />
                                        SIGN IN
                                    </Button>
                                </Link>
                            </Login>
                            <Hr />
                        </>
                    )}

                    <Item>
                        <LibraryMusic style={{ fontSize: "20px" }} />
                        Music
                    </Item>
                    <Item>
                        <SportsBasketball style={{ fontSize: "20px" }} />
                        Sports
                    </Item>
                    <Item>
                        <SportsEsports style={{ fontSize: "20px" }} />
                        Gaming
                    </Item>
                    <Item>
                        <LocalMovies style={{ fontSize: "20px" }} />
                        Movies
                    </Item>
                    <Item>
                        <Newspaper style={{ fontSize: "20px" }} />
                        News
                    </Item>
                    <Item>
                        <LiveTv style={{ fontSize: "20px" }} />
                        Live
                    </Item>
                    <Hr />
                    <Item>
                        <Settings style={{ fontSize: "20px" }} />
                        Settings
                    </Item>
                    <Item>
                        <ReportGmailerrorred style={{ fontSize: "20px" }} />
                        Report
                    </Item>
                    <Item>
                        <Help style={{ fontSize: "20px" }} />
                        Help
                    </Item>
                </Wrapper>
            </Container>
            {!close && <BlankClosePage onClick={() => setClose(true)} />}
        </>
    );
};

export default Menu;
