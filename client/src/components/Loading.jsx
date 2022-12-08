import styled from "styled-components";

const Container = styled.div`
    grid-area: main;

    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};

    /* padding-top: 8px; */
    padding-bottom: 50px;
    /* padding-left: 10px;
    padding-right: 10px; */

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 641px) {
    }
    @media (min-width: 961px) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas: "video video video recommend";
    }
`;

const Wrapper = styled.div`
    /* background-color: red; */
    height: 40px;
    width: 40px;

    -webkit-animation: rotation 1s infinite linear;
    -moz-animation: rotation 1s infinite linear;
    -o-animation: rotation 1s infinite linear;
    animation: rotation 1s infinite linear;
    border: 6px solid rgba(255, 253, 253, 0.2);
    border-radius: 100%;

    &::before {
        content: "";
        display: block;
        /* height: 20px;
        width: 20px; */
        height: 100%;
        width: 100%;

        position: relative;
        top: -6px;
        left: -6px;

        border-top: 6px solid rgba(255, 255, 255, 0.8);
        border-left: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 6px solid transparent;
        border-radius: 100%;
    }

    @-webkit-keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(359deg);
        }
    }
    @-moz-keyframes rotation {
        from {
            -moz-transform: rotate(0deg);
        }
        to {
            -moz-transform: rotate(359deg);
        }
    }
    @-o-keyframes rotation {
        from {
            -o-transform: rotate(0deg);
        }
        to {
            -o-transform: rotate(359deg);
        }
    }
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
`;

const Loading = () => {
    return (
        <Container>
            loading wait ... <Wrapper></Wrapper>
        </Container>
    );
};

export default Loading;
