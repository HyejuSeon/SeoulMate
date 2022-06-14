import React from 'react';

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

const UploadResult = () => {
    return (
        <UploadResultWrapper>
            <UploadResultLeft>
                <ImgContainer></ImgContainer>
                <UploadResultContentContainer>
                    <UploadResultContentInfoTitle>
                        <div>사진 제목</div>
                        <div>Date</div>
                        <div>ID</div>
                    </UploadResultContentInfoTitle>
                    <UploadResultContentInfo>
                        {' '}
                        <div>블라블라.jpg</div>
                        <div>22/12/2019</div>
                        <div>By Elice</div>
                    </UploadResultContentInfo>
                    <UploadResultContentPeopleContainer>
                        <UploadResultPeopleImg src={Luggage} />
                        24명의 랜드마커들이 다녀갔습니다
                    </UploadResultContentPeopleContainer>
                </UploadResultContentContainer>
                <UploadResultBtnContainer>
                    <UploadResultBtn>게시하기</UploadResultBtn>
                    <UploadResultBtn>기록하기</UploadResultBtn>
                    <UploadResultBtn>뒤로가기</UploadResultBtn>
                </UploadResultBtnContainer>
            </UploadResultLeft>
            <UploadResultRight>
                <UploadResultNameContainer>
                    <UploadResultNameImg src={name} />
                    랜드마크 이름: 블라블라
                </UploadResultNameContainer>
                <UploadResultLocationContainer>
                    <UploadResultLocationImg src={location} />
                    랜드마크 위치: 블라블라
                </UploadResultLocationContainer>
                <UploadResultDescriptionContainer>
                    <UploadResultDescriptionImg src={description} />
                    랜드마크 설명: 블라블라
                </UploadResultDescriptionContainer>
            </UploadResultRight>
        </UploadResultWrapper>
    );
};

export default UploadResult;
