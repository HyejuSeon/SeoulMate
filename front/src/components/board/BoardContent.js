import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { searchLandmarkInfoState, landmarkPicState } from '../../atom';

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
    EmptyContainer,
    BoardUploadResultDescriptionContainer,
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

    // console.log('searchState', props.searchState);
    // console.log('allBoardContent', allBoardContent);

    const isNullSearchList = useMemo(
        () => !searchResult.length && props.searchState,
        [props.searchState, searchResult.length],
    );
    return (
        <>
            {isNullSearchList && (
                <EmptyContainer>'{props.searchTerm}'에 대한 검색결과가 없습니다.</EmptyContainer>
            )}
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
                                  <BoardUploadResultDescriptionContainer>
                                      <UploadResultDescriptionImg
                                          src={description}
                                          alt={description}
                                      />
                                      랜드마크 설명: {item.description?.substring(0, 100)}..
                                  </BoardUploadResultDescriptionContainer>
                              </UploadResultContentContainer>
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
                                      랜드마크 설명: {item.description.substring(0, 30)}
                                  </UploadResultDescriptionContainer>
                              </UploadResultContentContainer>
                          </BoardContentContainer>
                      );
                  })}
        </>
    );
};

export default BoardContent;
