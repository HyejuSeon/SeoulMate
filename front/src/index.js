import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecoilRoot } from 'recoil';

import 'swiper/css/bundle';
import './components/home/Home.css';

import Footer from '../src/components/Footer';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <Header />
                <App />
            </RecoilRoot>
        </BrowserRouter>
        <Footer />
    </React.StrictMode>,
);
