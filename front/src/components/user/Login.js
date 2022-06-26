import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import { DispatchContext } from '../../App.js';
import { ROUTES } from '../../Route';
import styled from 'styled-components';
import style from '../../styledCompo/LoginStyle/Login.moudule.css';
import CssTextField from './CssTextField';
// import recoil
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userState, userInfoState, tokenState } from '../../atom';

function Login() {
    // 전역 유저 정보
    const navigate = useNavigate();

    const setUser = useSetRecoilState(userState);
    const setToken = useSetRecoilState(tokenState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const dispatch = useContext(DispatchContext);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //user 로그인 api 호출!
            const res = await Api.post('users/login', form);
            const user = res.data;

            //recoil전역으로 관리할 정보
            setUser(user);
            setUserInfo(user);
            setToken(user.accessToken);

            console.log(setUser);
            console.log(setToken);
            console.log('a');

            const jwtToken = user.accessToken;
            sessionStorage.setItem('userToken', jwtToken);

            navigate('/');

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: user,
            });
        } catch (error) {
            alert(error.response.data);
        }
    };
    return (
        <LoginBody onSubmit={handleSubmit}>
            <Box style={{ textAlign: 'center', marginTop: '20vh' }}>
                <CssTextField
                    style={{ width: '30%' }}
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    variant="standard"
                    InputLabelProps={{
                        style: { color: '#BBD6FF' },
                    }}
                    required
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </Box>

            <Box style={{ textAlign: 'center', marginTop: '12vh' }}>
                <CssTextField
                    style={{ width: '30%' }}
                    id="standard-basic"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    variant="standard"
                    InputLabelProps={{
                        style: { color: '#BBD6FF' },
                    }}
                    required
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                        }))
                    }
                />
            </Box>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '5vh',
                }}
            >
                <button
                    type="submit"
                    style={{
                        width: '30vw',
                        borderRadius: '50px',
                        border: 'none',
                        backgroundColor: '#BBD6FF',
                        color: 'white',
                        padding: '5px',
                        fontSize: 'x-large',
                        cursor: 'pointer',
                    }}
                >
                    LOG IN
                </button>
                <Box class={style.otherButtonbox}>
                    <Link to={'/register'} class={style.createaccountButton}>
                        Create Account
                    </Link>
                    <Link to={'/Password'} class={style.forgotpasswordButton}>
                        Forgot password?
                    </Link>
                </Box>
            </div>
        </LoginBody>
    );
}

export default Login;

const LoginBody = styled.form``;

const LoginBodyUpper = styled.div`
    display: flex;
`;

const LoginTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding-top: 14px;
`;
const LoginTitle2 = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding-top: 4px;
`;
