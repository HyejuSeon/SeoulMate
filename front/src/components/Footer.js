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

    z-index: 1000;
`;

function Footer() {
<<<<<<< HEAD
  return (
    <>
      <Container>
        Copyright{new Date().getFullYear()} by team-ai-project. All Page content is property of
        상원 해요
      </Container>
    </>
  );
=======
    return (
        <>
            <Container>
                &copy;{new Date().getFullYear()} SeoulMate | All rights reserved | Terms Of Service
                | Privacy😎
            </Container>
        </>
    );
>>>>>>> ff2e6fa16c0bf40d101107b57c87d59cc4ec4f67
}

export default Footer;
