import React, { useState, useEffect } from 'react';

import {
    BoardContentContainer,
    ImgContainer,
    UploadResultContentContainer,
    UploadResultContentPeopleContainer,
    UploadResultPeopleImg,
    UploadResultNameContainer,
    UploadResultNameImg,
    UploadResultLocationContainer,
    UploadResultLocationImg,
    UploadResultDescriptionContainer,
    UploadResultDescriptionImg,
} from './BoardContentStyle';
import * as API from '../../api';

import description from '../../img/description.png';
import name from '../../img/name.png';
import location from '../../img/location.png';
import Luggage from '../../img/Luggage.png';

const BoardContent = () => {
    const [allBoardContent, setAllBoardContent] = useState('');

    useEffect(() => {
        const getBoardContent = async () => {
            const res = await API.get('board/8411223d-c4ee-4f13-b4db-efb832b90ade');
            // const res = await API.get('visited/top');
            console.log(res.data);
            const content = res.data;
            setAllBoardContent(content);
            console.log('content', content);
        };
        getBoardContent();
    }, []);

    // const ContentsRender = allBoardContent.map((item, idx) => {
    //     return <></>;
    // });
    return (
        <>
            <BoardContentContainer>
                <ImgContainer src={allBoardContent.landmark_img_id} />
                <UploadResultContentContainer>
                    <UploadResultNameContainer>
                        <UploadResultNameImg src={name} />
                        광화문
                    </UploadResultNameContainer>
                    <UploadResultLocationContainer>
                        <UploadResultLocationImg src={location} />
                        광화문 주소
                    </UploadResultLocationContainer>
                    <UploadResultDescriptionContainer>
                        <UploadResultDescriptionImg src={description} />
                        광화문 설명
                    </UploadResultDescriptionContainer>
                </UploadResultContentContainer>
                <UploadResultContentPeopleContainer>
                    <UploadResultPeopleImg src={Luggage} />
                    24명의 랜드마커들이 다녀갔습니다
                </UploadResultContentPeopleContainer>
            </BoardContentContainer>
        </>
    );
};

export default BoardContent;
