import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
    height: 60px;
    width: 100%;

    background-color: #e9e9e9;

    padding-top: 40px;

    font-size: 1rem;
    font-weight: bold;
    color: #a4a4a4;
    text-align: center;

    /* z-index: 1000; */
`;

function Footer() {
    return (
        <>
            <Container>
                &copy;{new Date().getFullYear()} SeoulMate | All rights reserved | Terms Of Service
                | Privacy😎
            </Container>
        </>
    );
}

export default Footer;
