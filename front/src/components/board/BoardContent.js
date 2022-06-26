import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { searchLandmarkInfoState } from '../../atom';

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

const BoardContent = (props) => {
    const navigate = useNavigate();
    const [allBoardContent, setAllBoardContent] = useState([]);
    const searchResult = useRecoilValue(searchLandmarkInfoState);

    useEffect(() => {
        const getBoardContent = async () => {
            const res = await API.post('board/list?perPage=50');
            const content = res.data;
            setAllBoardContent(content.payloads);
        };
        getBoardContent();
    }, []);

    console.log('searchState', props.searchState);
    console.log('allBoardContent', allBoardContent);

    return (
        <>
            {props.searchState === false
                ? allBoardContent &&
                  allBoardContent.map((item, idx) => {
                      return (
                          <BoardContentContainer key={idx}>
                              <ImgContainer
                                  src={item.landmark_img_id}
                                  onClick={() =>
                                      navigate(`/board/${item.board_id}`, {
                                          state: { allBoardContent },
                                      })
                                  }
                              />
                              <UploadResultContentContainer>
                                  <UploadResultNameContainer>
                                      <UploadResultNameImg src={name} alt={name} />
                                      랜드마크 이름: {item.landmark_name}
                                  </UploadResultNameContainer>
                                  <UploadResultLocationContainer>
                                      <UploadResultLocationImg src={location} alt={location} />
                                      랜드마크 주소: {item.location}
                                  </UploadResultLocationContainer>
                                  <UploadResultDescriptionContainer>
                                      <UploadResultDescriptionImg
                                          src={description}
                                          alt={description}
                                      />
                                      광화문 설명: {item.description}
                                  </UploadResultDescriptionContainer>
                              </UploadResultContentContainer>
                              <UploadResultContentPeopleContainer>
                                  <UploadResultPeopleImg src={Luggage} />
                                  00명의 랜드마커들이 다녀갔습니다
                              </UploadResultContentPeopleContainer>
                          </BoardContentContainer>
                      );
                  })
                : searchResult &&
                  searchResult.map((item, idx) => {
                      return (
                          <BoardContentContainer key={idx}>
                              <ImgContainer
                                  src={item.landmark_img_id}
                                  onClick={() =>
                                      navigate(`/board/${item.board_id}`, {
                                          state: { allBoardContent },
                                      })
                                  }
                              />
                              <UploadResultContentContainer>
                                  <UploadResultNameContainer>
                                      <UploadResultNameImg src={name} alt={name} />
                                      랜드마크 이름: {item.landmark_name}
                                  </UploadResultNameContainer>
                                  <UploadResultLocationContainer>
                                      <UploadResultLocationImg src={location} alt={location} />
                                      랜드마크 주소: {item.location}
                                  </UploadResultLocationContainer>
                                  <UploadResultDescriptionContainer>
                                      <UploadResultDescriptionImg
                                          src={description}
                                          alt={description}
                                      />
                                      광화문 설명: {item.description}
                                  </UploadResultDescriptionContainer>
                              </UploadResultContentContainer>
                              <UploadResultContentPeopleContainer>
                                  <UploadResultPeopleImg src={Luggage} />
                                  24명의 랜드마커들이 다녀갔습니다
                              </UploadResultContentPeopleContainer>
                          </BoardContentContainer>
                      );
                  })}
        </>
    );
};

export default BoardContent;
