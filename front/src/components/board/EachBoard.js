import React, { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { landmarkInfoState, userInfoState } from '../../atom';
import { useNavigate, useLocation } from 'react-router-dom';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

import * as API from '../../api';
import { ValidationTextField } from '../upload/MuiCustom';
import BoardComment from './BoardComment';

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

import {
    BoardWrapper,
    BoardTitleWrapper,
    BoardTitle,
    BoardTitleContainer,
    BoardContentWrapper,
    BoardContent,
    BoardContentContainer,
} from './EachBoardStyle';

import description from '../../img/description.png';
import name from '../../img/name.png';
import location from '../../img/location.png';
import Luggage from '../../img/Luggage.png';

const EachBoard = () => {
    const user = useRecoilValue(userInfoState);
    console.log('user:', user);
    const [eachBoardInfo, setEachBoardInfo] = useState('');
    const moment = require('moment');
    const today = moment();
    const date = today.format('YYYY-MM-DD');
    const ref = useRef();
    const navigate = useNavigate();
    const allBoardContent = useLocation();
    const getBoardId = allBoardContent.pathname.substring(7);

    const [title, setTitle] = useState(eachBoardInfo.title);
    const [content, setContent] = useState(eachBoardInfo.content);

    useEffect(() => {
        const getEachBoard = async () => {
            const res = await API.get(`board/${getBoardId}`);
            setEachBoardInfo(res.data);
            setTitle(res.data.title);
            setContent(res.data.content);
        };
        getEachBoard();
    }, []);

    console.log('넘겨받은거', allBoardContent);
    console.log('게시글 받아온거', eachBoardInfo);
    console.log('게시글 제목', title);
    console.log('게시글 내용', content);

    const boardDelHandler = async () => {
        await API.delData(`board/delete?boardId=${getBoardId}`);
        navigate('/board');
    };

    const updateHandleSubmit = async (e) => {
        try {
            await API.putQuery(
                `board/update?board_id=${eachBoardInfo.board_id}&title=${title}&content=${content}`,
            );
            navigate('/Board');
        } catch (err) {
            console.log('err');
        }
    };

    return user.user_id && user.user_id === eachBoardInfo.userId ? (
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
                                <span>{eachBoardInfo.created_at.substring(0, 10)}</span>
                                <span>By Elice</span>
                            </UploadResultContentInfo>
                            <UploadResultContentPeopleContainer>
                                <UploadResultPeopleImg src={Luggage} />
                                24명의 랜드마커들이 다녀갔습니다
                            </UploadResultContentPeopleContainer>
                        </UploadResultContentContainer>
                        {/* <BoardComment></BoardComment> */}
                        <UploadResultBtnContainer>
                            <UploadResultBtn
                                onClick={() => {
                                    ref.current.toggle();
                                }}
                            >
                                수정하기
                            </UploadResultBtn>
                            <UploadResultBtn onClick={boardDelHandler}>삭제하기</UploadResultBtn>
                            <UploadResultBtn onClick={() => navigate('/board')}>
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
                                multiline
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                focused
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
                                focused
                            />
                        </UploadResultContentContainer>
                        <UploadResultBtnContainer>
                            <UploadResultBtn onClick={updateHandleSubmit}>확인</UploadResultBtn>
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
    ) : (
        <UploadResultWrapper>
            <UploadResultLeft>
                <ImgContainer src={eachBoardInfo.landmark_img_id} alt="" />
                <BoardWrapper>
                    <BoardTitleWrapper>
                        <BoardTitle>제목</BoardTitle>
                        <BoardTitleContainer>{eachBoardInfo.title}</BoardTitleContainer>
                    </BoardTitleWrapper>
                    <BoardContentWrapper>
                        <BoardContent>내용</BoardContent>
                        <BoardContentContainer>{eachBoardInfo.content}</BoardContentContainer>
                    </BoardContentWrapper>
                </BoardWrapper>
                <UploadResultContentPeopleContainer>
                    <UploadResultPeopleImg src={Luggage} />
                    24명의 랜드마커들이 다녀갔습니다
                </UploadResultContentPeopleContainer>
            </UploadResultLeft>
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
