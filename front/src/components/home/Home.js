import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import './Home.css';

import place from '../../img/Place.png';

import KakaoMap from './kakaoMap';

import {
    StartButton,
    FirstPage,
    PhotoContainer,
    HeadCopy,
    SecondPage,
    SecondPageHeadCopy,
    SecondPageBodyCopy,
    SecondPageBodyCopy2,
    StartButton2,
    ThirdPage,
    ThirdPageHeadCopy,
    ThirdPageContentContainer,
    ThirdPageImgContainer,
    ThirdPageContentWrapper,
    ThirdPageContentDescription,
    ThirdPageContentDescription2,
    ThirdPageContentUserInfo,
    ThirdPageContentLocationInfo,
    FourthPage,
    FourthPageHeadCopy,
    FourthPageBodyCopy,
    FourthPageMapContainer,
} from '../../styledCompo/homeStyle/Homestyle';

import img_1 from '../../img/landMark1.jpg';
import img_2 from '../../img/landMark2.jpg';
import img_3 from '../../img/landMark3.jpg';
import img_4 from '../../img/landMark4.jpg';

import Logo from '../../img/logo.png';

const Home = () => {
    const navigate = useNavigate();

    const MainImage = [img_1, img_2, img_3, img_4];

    const MainiImageRender = MainImage.map((item, idx) => {
        return (
            <SwiperSlide key={idx}>
                <StartButton onClick={() => navigate('/main')}>시작하기</StartButton>
                <HeadCopy>
                    랜드마크를 찾아 사진을 찍으세요.
                    <br />
                    서울메이트가 당신의 추억을 기록해드립니다.{' '}
                </HeadCopy>
                <PhotoContainer>
                    <img src={item} alt="landmark img" />
                </PhotoContainer>
            </SwiperSlide>
        );
    });

    const SubImageRender = MainImage.map((item, idx) => {
        return (
            <SwiperSlide key={idx}>
                <img src={item} alt="landmark img" />
            </SwiperSlide>
        );
    });

    const UserImageRender = MainImage.map((item, idx) => {
        return (
            <ThirdPageContentWrapper>
                <ThirdPageImgContainer>
                    <img src={item} alt="user img" style={{ width: '528px', height: '295px' }} />
                </ThirdPageImgContainer>
                <ThirdPageContentDescription>
                    랜드마크 설명 너무 이뻐요 멋있어요 블라블라{' '}
                </ThirdPageContentDescription>
                <ThirdPageContentDescription2>
                    <ThirdPageContentUserInfo>유저이름</ThirdPageContentUserInfo>
                    <ThirdPageContentLocationInfo>
                        <img src={place} alt="location" style={{ width: '30px', height: '30px' }} />
                        랜드마크 주소 정보 서울 특별시 어쩌구저쩌구
                    </ThirdPageContentLocationInfo>
                </ThirdPageContentDescription2>
            </ThirdPageContentWrapper>
        );
    });

    return (
        <>
            <FirstPage>
                <Swiper
                    rewind={true}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    style={{ '--swiper-navigation-color': '#e1f0fb' }}
                >
                    {MainiImageRender}
                </Swiper>
            </FirstPage>
            <SecondPage>
                <SecondPageHeadCopy>
                    <br />
                    랜드마크의 발견, SeoulMate.
                </SecondPageHeadCopy>
                <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper"
                    style={{
                        width: '60%',
                        height: '40%',
                        position: 'relative',
                    }}
                >
                    {SubImageRender}
                </Swiper>
                <SecondPageBodyCopy>
                    서울의 다양한 랜드마크들을 발견하고
                    <br />
                    기록으로 남겨보세요.
                    <br />
                </SecondPageBodyCopy>
                <SecondPageBodyCopy2>지금 바로 카메라를 켜세요 !</SecondPageBodyCopy2>
                <StartButton2>시작하기</StartButton2>
            </SecondPage>
            <ThirdPage>
                <ThirdPageHeadCopy>매력적인 랜드마크 정보</ThirdPageHeadCopy>
                <ThirdPageContentContainer>{UserImageRender}</ThirdPageContentContainer>
            </ThirdPage>
            <FourthPage>
                <FourthPageHeadCopy>
                    랜드마커들이 다녀간
                    <br />
                    다양한 랜드마크들
                </FourthPageHeadCopy>
                <FourthPageBodyCopy>
                    지금까지 랜드마커들이 다녀간
                    <br />
                    서울의 다양한 랜드마크들을 구경하세요.
                </FourthPageBodyCopy>
                <FourthPageMapContainer>
                    <KakaoMap></KakaoMap>
                </FourthPageMapContainer>
                <StartButton2>시작하기</StartButton2>
            </FourthPage>
        </>
    );
};

export default Home;
