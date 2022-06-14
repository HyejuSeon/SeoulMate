import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #ffff;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    width: 15%;
    height: 40%;
    text-align: left;
    padding: 2rem;
    position: relative;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;
    z-index: 50;
    font-family: 'Jeju Gothic', sans-serif;

    @media (max-width: 576px) {
        width: 100%;
    }

    a {
        font-size: 1.2rem;
        text-transform: uppercase;
        padding: 2rem 0;
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: #0d0c1d;
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: 576px) {
            font-size: 1.5rem;
            text-align: center;
        }

        &:hover {
            color: #343078;
        }
    }
`;

const Menu = ({ open }) => {
    return (
        <StyledMenu open={open}>
            <a href="/login">
                <span role="img" aria-label="about us" />
                로그인
            </a>
            <a href="/register">
                <span role="img" aria-label="price" />
                회원가입
            </a>
            <a href="/">
                <span role="img" aria-label="contact" />
                Contact
            </a>
        </StyledMenu>
    );
};

export default Menu;
