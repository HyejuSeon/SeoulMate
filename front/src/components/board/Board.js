import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../api';
import BoardContent from './BoardContent';
import { Container, Grid } from '@mui/material';
import { BoardWrapper, BoardSearchContainer, BoardSearchImg, BoardContainer } from './BoardStyle';
import { ValidationTextField } from '../upload/MuiCustom';
import Search from '../../img/Search.png';
import { useRecoilState } from 'recoil';
import { searchLandmarkInfoState } from '../../atom';

const Board = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    //검색결과 데이터를 전역으로 저장
    const [searchResult, setSearchResult] = useRecoilState(searchLandmarkInfoState);

    const SearchHandler = async (e) => {
        e.preventDefault();
        const res = await API.post(`board/search?keyword=${searchTerm}`);
        const SearchData = res.data;
        setSearchResult(SearchData);
    };

    // useEffect(() => {
    //     console.log('검색결과', searchResult);
    // }, [searchResult]);

    return (
        <>
            <BoardWrapper>
                <BoardSearchContainer>
                    <ValidationTextField
                        id="outlined-basic"
                        label="검색"
                        variant="outlined"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <BoardSearchImg src={Search} onClick={SearchHandler} />
                </BoardSearchContainer>
                <BoardContainer>
                    <Container sx={{ marginTop: 1, flexGrow: 1 }}>
                        <Grid container>
                            <BoardContent />
                        </Grid>
                    </Container>
                </BoardContainer>
            </BoardWrapper>
        </>
    );
};

export default Board;
