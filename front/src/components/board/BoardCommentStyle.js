import styled from 'styled-components';

export const BoardCommentContainer = styled.div`
    width: 35rem;
    height: auto;

    display: flex;
    /* flex-direction: row; */
    align-items: center;
    /* background-color: gray; */
    justify-content: space-around;
    margin-top: 1rem;
`;

export const BoardCommentImg = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    width: 2rem;
    height: 2rem;
    /* background: blue; */
    margin-left: 1rem;
`;
export const BoardCommentBox = styled.div`
    width: 30rem;
    margin-left: 0.5rem;

    /* background-color: red; */
`;

export const BoardBtnBox = styled.div`
    /* background-color: yellow; */
    display: flex;
`;

export const BoardCommentBtn = styled.button`
    font-family: 'Jeju Gothic', sans-serif;
    box-sizing: border-box;

    position: relative;
    width: 2rem;
    height: 2rem;

    background: black;
    border: 2px solid #ffffff;

    border-radius: 60px;
    cursor: pointer;

    font-size: 1.5rem;
    color: white;
`;
