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
export const BoardImgBox = styled.div`
    width: 5rem;
    height: 2rem;
    margin-left: 0.5rem;

    /* background-color: red; */
`;
export const BoardUserNameBox = styled.div`
    width: 5rem;
    display: flex;

    justify-content: center;
    align-items: center;
    /* background-color: blue; */
`;
export const BoardCommentImg = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    width: 2rem;
    height: 2rem;
    /* background: blue; */
    margin-left: 1.6rem;
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

export const BoardBtnContainer = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    /* flex-direction: row; */
    align-items: center;
    /* background-color: gray; */
    justify-content: space-around;
    margin-top: 1rem;
`;

export const ToggleButton = styled.img`
    /* margin-top: 0.6rem; */
    margin-right: 0.2rem;
    right: 34rem;
    width: 2rem;
    height: 2rem;
    /* position: absolute; */
    cursor: pointer;
`;
