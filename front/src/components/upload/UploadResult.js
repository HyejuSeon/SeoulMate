import React, { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { landmarkInfoState } from '../../atom';
import { useNavigate, useLocation } from 'react-router-dom';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

import * as API from '../../api';
import { ValidationTextField } from './MuiCustom';

import {
    UploadResultWrapper,
    UploadResultLeft,
    ImgContainer,
    UploadResultContentContainer,
    UploadResultContentInfoTitle,
    UploadResultContentInfo,
    UploadResultContentPeopleContainer,
    UploadResultPeopleImg,
    UploadResultBtnContainer,
    UploadResultBtn,
    UploadResultRight,
    UploadResultNameContainer,
    UploadResultNameImg,
    UploadResultLocationContainer,
    UploadResultLocationImg,
    UploadResultDescriptionContainer,
    UploadResultDescriptionImg,
} from './UploadResultStyle';

import description from '../../img/description.png';
import name from '../../img/name.png';
import location from '../../img/location.png';
import Luggage from '../../img/Luggage.png';

import img_4 from '../../img/landMark4.jpg';

const UploadResult = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [restaurant, setRestaurant] = useState('test');
    const [landmark_img, setLandmark_img] = useState('test');
    const [landmarkInfo, setLandmarkInfo] = useState('test');

    const ref = useRef();
    const navigate = useNavigate();
    const landmarkLocation = useLocation();
    // const Info = useRecoilValue(landmarkInfoState);
    // const Info = useRecoilValue(landmarkInfoState);
    // console.log('랜드마크정보', Info);

    useEffect(() => {
        setLandmarkInfo(landmarkLocation.state);
        console.log('location', landmarkInfo);
    }, [landmarkInfo, landmarkLocation.state, navigate]);

    // console.log('board', title);
    // console.log('board', content);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post('/board', {
                title,
                content,
                restaurant,
                landmark_img,
            });
            navigate('/Board');
        } catch (err) {
            console.log('err');
        }
    };

    return (
        <UploadResultWrapper>
            <Flippy ref={ref} flipOnClick={false} flipDirection="horizontal">
                <FrontSide style={{ padding: '0', boxShadow: 'none' }}>
                    <UploadResultLeft>
                        <ImgContainer src={img_4} />
                        <UploadResultContentContainer>
                            <UploadResultContentInfoTitle>
                                <div>사진 제목</div>
                                <div>Date</div>
                                <div>ID</div>
                            </UploadResultContentInfoTitle>
                            <UploadResultContentInfo>
                                {' '}
                                <div>광안대교</div>
                                <div>22/12/2019</div>
                                <div>By Elice</div>
                            </UploadResultContentInfo>
                            <UploadResultContentPeopleContainer>
                                <UploadResultPeopleImg src={Luggage} />
                                24명의 랜드마커들이 다녀갔습니다
                            </UploadResultContentPeopleContainer>
                        </UploadResultContentContainer>
                        <UploadResultBtnContainer>
                            <UploadResultBtn
                                onClick={() => {
                                    ref.current.toggle();
                                }}
                            >
                                게시글 작성하기
                            </UploadResultBtn>
                            <UploadResultBtn>기록하기</UploadResultBtn>
                            <UploadResultBtn onClick={() => navigate('/Upload')}>
                                뒤로가기
                            </UploadResultBtn>
                        </UploadResultBtnContainer>
                    </UploadResultLeft>
                </FrontSide>
                <BackSide style={{ padding: '0', boxShadow: 'none' }}>
                    <UploadResultLeft>
                        <ImgContainer src={img_4} />
                        <UploadResultContentContainer>
                            <ValidationTextField
                                id="outlined-basic"
                                label="제목"
                                variant="outlined"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />

                            <ValidationTextField
                                id="outlined-multiline-static"
                                label="내용"
                                value={content}
                                multiline
                                rows={6}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                        </UploadResultContentContainer>
                        <UploadResultBtnContainer>
                            <UploadResultBtn onClick={handleSubmit}>확인</UploadResultBtn>
                            <UploadResultBtn
                                onClick={() => {
                                    ref.current.toggle();
                                }}
                            >
                                취소
                            </UploadResultBtn>
                        </UploadResultBtnContainer>
                    </UploadResultLeft>
                </BackSide>
            </Flippy>

            <UploadResultRight>
                <UploadResultNameContainer>
                    <UploadResultNameImg src={name} />

                    {landmarkInfo.name}
                </UploadResultNameContainer>
                <UploadResultLocationContainer>
                    <UploadResultLocationImg src={location} />
                    {landmarkInfo.add}
                </UploadResultLocationContainer>
                <UploadResultDescriptionContainer>
                    <UploadResultDescriptionImg src={description} />
                    {landmarkInfo.description}
                </UploadResultDescriptionContainer>
            </UploadResultRight>
        </UploadResultWrapper>
    );
};

export default UploadResult;
