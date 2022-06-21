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
    const [landmarkPicInfo, setLandmarkPicInfo] = useState('test');

    const ref = useRef();
    const navigate = useNavigate();
    const landmarkLocation = useLocation();

    useEffect(() => {
        setLandmarkInfo(landmarkLocation.state.landmarkInfo);
        setLandmarkPicInfo(landmarkLocation.state.landmarkPic);
        console.log('업로드에서 넘어온 랜드마크 정보', landmarkInfo);
        console.log('업로드에서 넘어온 사진 정보', landmarkPicInfo);
    }, [landmarkInfo, landmarkPicInfo]);

    //랜드마크 url 변수 저장
    let imgSrc = 'http://localhost:5001' + landmarkPicInfo.landmark_img;

    // console.log('board', title);
    // console.log('board', content);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const variable = {
            title: title,
            content: content,
            restaurant: restaurant,
            landmark_img_id: landmarkPicInfo.landmark_img,
            landmark_name: landmarkInfo.name,
        };

        try {
            await API.post('board', variable);
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
                        <ImgContainer src={imgSrc} />
                        <UploadResultContentContainer>
                            <UploadResultContentInfoTitle>
                                <span>사진 제목</span>
                                <span>Date</span>
                                <span>ID</span>
                            </UploadResultContentInfoTitle>
                            <UploadResultContentInfo>
                                {' '}
                                <span>광안대교</span>
                                <span>22/12/2019</span>
                                <span>By Elice</span>
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
                        <ImgContainer src={imgSrc} />
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
