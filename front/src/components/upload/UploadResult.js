import React from 'react';

import {
    UploadResultWrapper,
    UploadResultLeft,
    ImgContainer,
    UploadResultContent,
    UploadResultBtnContainer,
    UploadResultBtn,
    UploadResultRight,
    UploadResultNameContainer,
    UploadResultNameImg,
    UploadResultLocationContainer,
    UploadResultLocationImg,
    UploadResultDescriptionContainer,
    UploadResultDescriptionImg,
} from '../../styledCompo/UploadStyle/UploadResultStyle';

const UploadResult = () => {
    return (
        <UploadResultWrapper>
            <UploadResultLeft>
                <ImgContainer></ImgContainer>
                <UploadResultContent>사진 정보</UploadResultContent>
                <UploadResultBtnContainer>
                    <UploadResultBtn>게시하기</UploadResultBtn>
                    <UploadResultBtn>기록하기</UploadResultBtn>
                    <UploadResultBtn>뒤로가기</UploadResultBtn>
                </UploadResultBtnContainer>
            </UploadResultLeft>
            <UploadResultRight>
                <UploadResultNameContainer>
                    <UploadResultNameImg></UploadResultNameImg>
                </UploadResultNameContainer>
                <UploadResultLocationContainer>
                    <UploadResultLocationImg></UploadResultLocationImg>
                </UploadResultLocationContainer>
                <UploadResultDescriptionContainer>
                    <UploadResultDescriptionImg></UploadResultDescriptionImg>
                </UploadResultDescriptionContainer>
            </UploadResultRight>
        </UploadResultWrapper>
    );
};

export default UploadResult;
