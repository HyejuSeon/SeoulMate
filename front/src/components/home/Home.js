import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../api';
import Swal from 'sweetalert2';
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
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoState, tokenState, userState } from '../../atom';

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
} from './Homestyle';
import img_1 from '../../img/landMark1.jpg';
import img_2 from '../../img/landMark2.jpg';
import img_3 from '../../img/landMark3.jpg';
import img_4 from '../../img/landMark4.jpg';

const Home = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(userInfoState);
    console.log('user:', user);

    const [sencondPageImgs, setSecondPageImgs] = useState([]);

    useEffect(() => {
        const getSecondPageImg = async () => {
            const res = await API.get('visited/top');
            setSecondPageImgs(res.data);
        };
        getSecondPageImg();
    }, []);

    console.log('탑4', sencondPageImgs);
    const start = () => {
        user
            ? navigate('/upload')
            : Swal.fire({
                  title: '로그인이 필요한 서비스 입니다',
                  text: '로그인 창으로 이동 하시겠습니까?',
                  icon: 'warning',
                  showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                  confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                  cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                  confirmButtonText: '확인', // confirm 버튼 텍스트 지정
                  cancelButtonText: '취소', // cancel 버튼 텍스트 지정
              }).then((result) => {
                  if (result.isConfirmed) {
                      // 만약 모달창에서 confirm 버튼을 눌렀다면
                      navigate('/login');
                  }
              });
    };

    const MainImage = [img_1, img_2, img_3, img_4];
    const MainiImageRender = MainImage.map((item, idx) => {
        return (
            <SwiperSlide key={idx}>
                <StartButton onClick={start}>시작하기</StartButton>
                <HeadCopy>
                    <p>랜드마크를 찾아 사진을 찍으세요.</p>
                    <p>서울메이트가 당신의 추억을 기록해드립니다.</p>{' '}
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

    const UserImageRender = sencondPageImgs.map((item, idx) => {
        return (
            <ThirdPageContentWrapper key={idx}>
                <ThirdPageImgContainer>
                    <img
                        src={item.landmark_img}
                        alt="user img"
                        style={{ width: '528px', height: '295px' }}
                    />
                </ThirdPageImgContainer>
                <ThirdPageContentDescription>
                    {item.description.substring(0, 40)}...{' '}
                </ThirdPageContentDescription>
                <ThirdPageContentDescription2>
                    <ThirdPageContentUserInfo>{item.name}</ThirdPageContentUserInfo>
                    <ThirdPageContentLocationInfo>
                        <img src={place} alt="location" style={{ width: '30px', height: '30px' }} />
                        {item.add}
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
                    랜드마크의 발견, SeoulMate
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
                <StartButton2 onClick={start}>시작하기</StartButton2>
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
                <StartButton2 onClick={start}>시작하기</StartButton2>
            </FourthPage>
        </>
    );
};

export default Home;
