import styled from "styled-components";

export const darkTheme = {
    bg: "#181818",
    bgLighter: "#353535",
    text: "white",
    textSoft: "#aaaaaa",
    soft: "#373737",
};

export const lightTheme = {
    bg: "#f9f9f9",
    bgLighter: "white",
    text: "black",
    textSoft: "#606060",
    soft: "#f5f5f5",
};

export const MainContainer = styled.div`
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px;
    grid-template-areas: "navbar  " " main  ";

    @media (min-width: 641px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 60px 1fr;
        grid-template-areas: "navbar navbar " " main main ";
    }

    @media (min-width: 961px) {
        display: grid;
        grid-template-columns: 250px 1fr;
        grid-template-rows: 60px 1fr;
        grid-template-areas: "navbar navbar" "menu main";
    }
`;
