import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { darkTheme, MainContainer } from "./utils/Theme";

import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import AddNewVideo from "./components/AddNewVideo";
import Search from "./pages/Search";
import UploadAvatar from "./pages/UploadAvatar";

//////////////////////////////////////////////////////////////////
import ReactGA from "react-ga";
const TRACKING_ID = "UA-249353688-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
//////////////////////////////////////////////////////////////////

const App = () => {
    const [close, setClose] = useState(true);
    const handleMenuClose = () => {
        setClose(!close);
        !close &&
            setTimeout(() => {
                window.location.reload();
            }, 100);
    };

    const [closeUpload, setCloseUpload] = useState(false);
    const handleCloseUpload = () => {
        setCloseUpload(!closeUpload);
    };

    ///////////////////////////////////////////////////////////////////
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    ///////////////////////////////////////////////////////////////////

    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter basename="/">
                <MainContainer>
                    <Menu
                        close={close}
                        handleMenuClose={handleMenuClose}
                        setClose={setClose}
                    />
                    <Navbar
                        handleMenuClose={handleMenuClose}
                        handleCloseUpload={handleCloseUpload}
                        closeUpload={closeUpload}
                        setClose={setClose}
                        close={close}
                    />
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home type="random" />} />
                            <Route
                                path="trends"
                                element={<Home type="trend" />}
                            />
                            <Route
                                path="subscriptions"
                                element={<Home type="sub" />}
                            />
                            <Route path="video">
                                <Route path=":id" element={<Video />} />
                            </Route>
                            <Route path="signin" element={<Signin />} />
                            <Route path="/search" element={<Search />} />
                            <Route
                                path="upload_avatar"
                                element={<UploadAvatar />}
                            />
                        </Route>
                    </Routes>
                </MainContainer>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
