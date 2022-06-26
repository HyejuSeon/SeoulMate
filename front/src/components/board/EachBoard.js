import React, { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { landmarkInfoState } from '../../atom';
import { useNavigate, useLocation } from 'react-router-dom';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

import * as API from '../../api';
import { ValidationTextField } from '../upload/MuiCustom';

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
} from '../upload/UploadResultStyle';

import description from '../../img/description.png';
import name from '../../img/name.png';
import location from '../../img/location.png';
import Luggage from '../../img/Luggage.png';

import img_4 from '../../img/landMark4.jpg';

const EachBoard = () => {
    const [eachBoardInfo, setEachBoardInfo] = useState('');

    const ref = useRef();
    const navigate = useNavigate();
    const allBoardContent = useLocation();
    const getBoardId = allBoardContent.pathname.substring(7);
    console.log('넘겨받은거', allBoardContent);

    useEffect(() => {
        const getEachBoard = async () => {
            const res = await API.get(`board/${getBoardId}`);
            setEachBoardInfo(res.data);
        };
        getEachBoard();
    }, [getBoardId]);

    console.log('게시글 받아온거', eachBoardInfo);
    //랜드마크 url 변수 저장
    // let imgSrc = landmarkPicInfo.landmark_img;

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const variable = {
    //         title: title,
    //         restaurant: restaurant,
    //         content: content,
    //         landmark_img_id: landmarkPicInfo.landmark_img,
    //         landmark_name: landmarkInfo.name,
    //         location: landmarkInfo.add,
    //         description: landmarkInfo.description.substring(0, 20),
    //     };

    //     try {
    //         await API.post('board', variable);
    //         navigate('/Board');
    //     } catch (err) {
    //         console.log('err');
    //     }
    // };

    return (
        <UploadResultWrapper>
            <Flippy ref={ref} flipOnClick={false} flipDirection="horizontal">
                <FrontSide style={{ padding: '0', boxShadow: 'none' }}>
                    <UploadResultLeft>
                        <ImgContainer src={eachBoardInfo.landmark_img_id} />
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
                        <ImgContainer src={eachBoardInfo.landmark_img_id} alt="" />
                        <UploadResultContentContainer>
                            <ValidationTextField
                                id="outlined-basic"
                                label="제목"
                                variant="outlined"
                                // value={title}
                                // onChange={(e) => {
                                //     setTitle(e.target.value);
                                // }}
                            />

                            <ValidationTextField
                                id="outlined-multiline-static"
                                label="내용"
                                // value={content}
                                multiline
                                rows={6}
                                // onChange={(e) => {
                                //     setContent(e.target.value);
                                // }}
                            />
                        </UploadResultContentContainer>
                        <UploadResultBtnContainer>
                            <UploadResultBtn>확인</UploadResultBtn>
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

                    {eachBoardInfo.landmark_name}
                </UploadResultNameContainer>
                <UploadResultLocationContainer>
                    <UploadResultLocationImg src={location} />
                    {eachBoardInfo.location}
                </UploadResultLocationContainer>
                <UploadResultDescriptionContainer>
                    <UploadResultDescriptionImg src={description} />
                    {eachBoardInfo.description}
                </UploadResultDescriptionContainer>
            </UploadResultRight>
        </UploadResultWrapper>
    );
};

export default EachBoard;
