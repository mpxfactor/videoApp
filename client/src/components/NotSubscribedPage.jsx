import { Link } from "react-router-dom";
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

const Text = styled.p`
    font-size: 1rem;
    font-weight: 600;
`;
const Explore = styled.button`
    cursor: pointer;
    padding: 10px;
    font-size: 1rem;
    background-color: #3ea6ff;
    color: white;
    border: none;
    -webkit-box-shadow: 1px 9px 107px 0px rgba(62, 166, 255, 1);
    -moz-box-shadow: 1px 9px 107px 0px rgba(62, 166, 255, 1);
    box-shadow: 1px 9px 107px 0px rgba(62, 166, 255, 1);
    &:active {
        background-color: #0088ff;
        -webkit-box-shadow: -200px -200px 0px -200px rgba(255, 0, 0, 1);
        -moz-box-shadow: -200px -200px 0px -200px rgba(255, 0, 0, 1);
        box-shadow: -200px -200px 0px -200px rgba(255, 0, 0, 1);
    }
`;

const NotSubscribedPage = () => {
    return (
        <Container>
            <Text>Not Subscribed To Any Channel</Text>
            <Link to="/">
                <Explore>Explore More</Explore>
            </Link>
        </Container>
    );
};

export default NotSubscribedPage;
