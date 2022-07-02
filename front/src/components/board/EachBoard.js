import React, { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atom';
import { useNavigate, useLocation } from 'react-router-dom';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

import * as API from '../../api';
import { ValidationTextField } from '../upload/MuiCustom';
import BoardComment from './BoardComment';
import Swal from 'sweetalert2';

import {
    UploadResultWrapper,
    UploadResultLeft,
    ImgContainer,
    UploadResultContentContainer,
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
    BoardInfoWrapper,
    BoardUserImg,
    BoardUserName,
    BoardDate,
    BoardCommentWrapper,
} from './EachBoardStyle';

import description from '../../img/description.png';
import name from '../../img/name.png';
import location from '../../img/location.png';
import Luggage from '../../img/Luggage.png';

const EachBoard = () => {
    const user = useRecoilValue(userInfoState);
    // console.log('user:', user);
    const [eachBoardInfo, setEachBoardInfo] = useState('');

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
    }, [getBoardId]);

    // console.log('넘겨받은거', allBoardContent);
    // console.log('게시글 받아온거', eachBoardInfo);
    // console.log('게시글 제목', title);
    // console.log('게시글 내용', content);
    // console.log('userEmail', userEmail);

    const boardDelHandler = async () => {
        Swal.fire({
            title: '게시글 삭제',
            text: '게시글을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            confirmButtonText: '확인', // confirm 버튼 텍스트 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        }).then((result) => {
            if (result.isConfirmed) {
                // 만약 모달창에서 confirm 버튼을 눌렀다면
                API.delData(`board/delete?boardId=${getBoardId}`);
                navigate('/board');
            }
        });
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
                        <BoardWrapper>
                            <BoardInfoWrapper>
                                <BoardUserImg src={eachBoardInfo.profile_image} alt="" />
                                <BoardUserName>{eachBoardInfo.email}</BoardUserName>
                                <BoardDate>
                                    게시글 작성 날짜: {eachBoardInfo?.created_at?.substring(0, 10)}
                                </BoardDate>
                            </BoardInfoWrapper>
                            <BoardTitleWrapper>
                                <BoardTitle>제목</BoardTitle>
                                <BoardTitleContainer>{eachBoardInfo.title}</BoardTitleContainer>
                            </BoardTitleWrapper>
                            <BoardContentWrapper>
                                <BoardContent>내용</BoardContent>
                                <BoardContentContainer>
                                    {eachBoardInfo.content}
                                </BoardContentContainer>
                            </BoardContentWrapper>
                        </BoardWrapper>
                        <BoardCommentWrapper>
                            <BoardComment />
                        </BoardCommentWrapper>
                        <UploadResultContentPeopleContainer>
                            <UploadResultPeopleImg src={Luggage} />
                            {eachBoardInfo.visitedCount}명의 랜드마커들이 다녀갔습니다
                        </UploadResultContentPeopleContainer>
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
                    <BoardInfoWrapper>
                        <BoardUserImg src={eachBoardInfo.profile_image} alt="" />
                        <BoardUserName>{eachBoardInfo.email}</BoardUserName>
                        <BoardDate>
                            게시글 작성 날짜: {eachBoardInfo?.created_at?.substring(0, 10)}
                        </BoardDate>
                    </BoardInfoWrapper>
                    <BoardTitleWrapper>
                        <BoardTitle>제목</BoardTitle>
                        <BoardTitleContainer>{eachBoardInfo.title}</BoardTitleContainer>
                    </BoardTitleWrapper>
                    <BoardContentWrapper>
                        <BoardContent>내용</BoardContent>
                        <BoardContentContainer>{eachBoardInfo.content}</BoardContentContainer>
                    </BoardContentWrapper>
                </BoardWrapper>
                <BoardCommentWrapper>
                    <BoardComment />
                </BoardCommentWrapper>
                <UploadResultContentPeopleContainer>
                    <UploadResultPeopleImg src={Luggage} />
                    {eachBoardInfo.visitedCount}명의 랜드마커들이 다녀갔습니다
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
