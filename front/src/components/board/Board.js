import React from 'react';

import BoardContent from './BoardContent';
import { Container, Grid } from '@mui/material';
import { BoardWrapper, BoardSearchContainer, BoardSearchImg, BoardContainer } from './BoardStyle';

import { ValidationTextField } from '../upload/MuiCustom';
import Search from '../../img/Search.png';

const Board = () => {
    return (
        <>
            <BoardWrapper>
                <BoardSearchContainer>
                    <ValidationTextField id="outlined-basic" label="검색" variant="outlined" />
                    <BoardSearchImg src={Search} />
                </BoardSearchContainer>
                <BoardContainer>
                    <Container title sx={{ marginTop: 1, flexGrow: 1 }}>
                        <Grid container spacing={4}>
                            <BoardContent></BoardContent>
                        </Grid>
                    </Container>
                </BoardContainer>
            </BoardWrapper>
        </>
    );
};

export default Board;
