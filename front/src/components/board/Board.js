import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as API from '../../api';
import BoardContent from './BoardContent';
import { Container, Grid } from '@mui/material';
import {
    BoardWrapper,
    BoardSearchContainer,
    BoardSearchImg,
    BoardContainer,
    InputContainer,
    ToggleButton,
} from './BoardStyle';
import { SearchTextField } from '../upload/MuiCustom';
import Search from '../../img/Search.png';
import clear from '../../img/cancel.png';
import { useRecoilState } from 'recoil';
import { searchLandmarkInfoState } from '../../atom';

const Board = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchState, setSearchState] = useState(false);

    //검색결과 데이터를 전역으로 저장
    const [searchResult, setSearchResult] = useRecoilState(searchLandmarkInfoState);

    const searchHandler = async (e) => {
        e.preventDefault();
        const res = await API.post(`board/search?keyword=${searchTerm}`);
        const SearchData = res.data;
        setSearchResult(SearchData.payloads);
        setSearchState(true);
    };

    useEffect(() => {
        // console.log('검색결과', searchResult);
    }, [searchResult]);

    const clearInput = useRef();

    const clearHandler = () => {
        setSearchTerm('');
        clearInput.current.focus();
        setSearchState(false);
    };

    return (
        <>
            <BoardWrapper>
                <BoardSearchContainer>
                    <InputContainer>
                        <SearchTextField
                            id="outlined-basic"
                            label="검색"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            ref={clearInput}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') searchHandler(e);
                            }}
                            InputProps={{
                                endAdornment: searchTerm && (
                                    <ToggleButton src={clear} onClick={clearHandler} />
                                ),
                            }}
                        />
                        {/* {searchTerm && <ToggleButton src={clear} onClick={clearHandler} />} */}
                        <BoardSearchImg src={Search} onClick={searchHandler} />
                    </InputContainer>
                </BoardSearchContainer>
                <BoardContainer>
                    <Container sx={{ marginTop: 1, flexGrow: 1 }}>
                        <Grid container>
                            <BoardContent searchState={searchState} searchTerm={searchTerm} />
                        </Grid>
                    </Container>
                </BoardContainer>
            </BoardWrapper>
        </>
    );
};

export default Board;
