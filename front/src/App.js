import React, { useState, useEffect, useReducer, createContext, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ROUTES } from './Route';
import Lottie from 'react-lottie';
import loading from './loading.json';

import * as Api from './api';
import './App.css';
import { loginReducer } from './reducer';

import { GlobalStyles } from './styledCompo/GlobalStyle';
import { useRecoilValue } from 'recoil';
import { userInfoState, tokenState } from './atom';

const Home = lazy(() => import('./components/home/Home'));
const Login = lazy(() => import('./components/user/Login'));
const Signin = lazy(() => import('./components/user/Signin'));
const Mypage = lazy(() => import('./components/mypage/Mypage'));
const Upload = lazy(() => import('./components/upload/Upload'));
const UploadResult = lazy(() => import('./components/upload/UploadResult'));
const BoardUpload = lazy(() => import('./components/board/Board'));
const Board = lazy(() => import('./components/board/Board'));

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
    const location = useLocation();
    const user = useRecoilValue(tokenState);
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location]);

    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
            const res = await Api.get('users/current/info');
            const currentUser = res.data;
            // console.log('currentUser:', currentUser);
            // console.log('abcd');

            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            // dispatch({
            //     type: 'LOGIN_SUCCESS',
            //     payload: currentUser,
            // });
            console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
        } catch (error) {
            console.log(error);
            console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
        }
        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    };

    // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <>
            {user ? (
                <Suspense
                    fallback={<Lottie options={defaultOptions} height={100} width={100}></Lottie>}
                >
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/mypage" element={<Mypage />} />
                        <Route path="/register" element={<Signin />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/uploadResult" element={<UploadResult />} />
                        <Route path="/boardUpload" element={<BoardUpload />} />
                        <Route path="/Board" element={<Board />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                    defaultOptions
                </Suspense>
            ) : (
                <Suspense
                    fallback={<Lottie options={defaultOptions} height={100} width={100}></Lottie>}
                >
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Signin />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/uploadResult" element={<UploadResult />} />
                        <Route path="/boardUpload" element={<BoardUpload />} />
                        <Route path="/Board" element={<Board />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Suspense>
            )}
        </>
    );
}

export default App;
