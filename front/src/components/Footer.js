import React from 'react';

import { Container } from '../styledCompo/footerStyle/FooterStyle';

function Footer() {
  return (
    <>
      <Container>
        Copyright{new Date().getFullYear()} by team-ai-project. All Page content is property of
        상원 해요
      </Container>
    </>
  );
}

export default Footer;
