import React, { useState, useEffect, useReducer, createContext, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
const Password = lazy(() => import('./components/user/Password'));
const Mypage = lazy(() => import('./components/mypage/Mypage'));
const Upload = lazy(() => import('./components/upload/Upload'));
const UploadResult = lazy(() => import('./components/upload/UploadResult'));
const BoardUpload = lazy(() => import('./components/board/Board'));
const Board = lazy(() => import('./components/board/Board'));
const EachBoard = lazy(() => import('./components/board/EachBoard'));

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useRecoilValue(tokenState);
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location]);

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
                        <Route path="/board" element={<Board />} />
                        <Route path="/Password" element={<Password />} />
                        <Route path="/board/:board_id" element={<EachBoard />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
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
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Suspense>
            )}
        </>
    );
}

export default App;
