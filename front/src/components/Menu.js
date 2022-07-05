import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userInfoState, tokenState, userState } from '../atom';

const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fce9e9;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    width: 15%;
    height: 60%;
    text-align: left;
    padding: 2rem;
    position: fixed;
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
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(false);
    const userToken = sessionStorage.getItem('userToken');

    const setUserState = useSetRecoilState(userState);
    const setTokenState = useSetRecoilState(tokenState);
    const setUserInfostate = useSetRecoilState(userInfoState);

    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [token, setToken] = useRecoilState(tokenState);
    const [recoilUser, setRecoilUser] = useRecoilState(userState);

    const stateInitialization = () => {
        if (!userToken) {
            setUserState({ user: null });
            setTokenState({ token: null });
            setUserInfostate(undefined);
        } else {
            setLoginState(true);
        }
    };
    useEffect(stateInitialization, [setTokenState, setUserInfostate, setUserState, userToken]);
    // console.log('loginState', loginState);

    const logout = () => {
        // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
        sessionStorage.removeItem('userToken');
        // dispatch 함수를 이용해 로그아웃함.
        // dispatch({ type: ‘LOGOUT’ });
        setRecoilUser(null);
        setUserInfo(null);
        setToken(null);

        // 기본 페이지로 돌아감.
        navigate('/login');
    };

    return (
        <StyledMenu open={open}>
            {loginState ? (
                <>
                    {' '}
                    <a href="/mypage">
                        <span role="img" aria-label="about us" />
                        마이페이지
                    </a>
                    <a href="/" onClick={logout}>
                        <span role="img" aria-label="price" />
                        로그아웃
                    </a>
                    <a href="/board">
                        <span role="img" aria-label="contact" />
                        게시판
                    </a>
                    <a href="/upload">
                        <span role="img" aria-label="contact" />
                        시작하기
                    </a>
                </>
            ) : (
                <>
                    {' '}
                    <a href="/login">
                        <span role="img" aria-label="about us" />
                        로그인
                    </a>
                    <a href="/register">
                        <span role="img" aria-label="price" />
                        회원가입
                    </a>
                </>
            )}
        </StyledMenu>
    );
};

export default Menu;
