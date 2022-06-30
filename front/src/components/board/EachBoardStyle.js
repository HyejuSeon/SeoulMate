import styled from 'styled-components';

export const BoardWrapper = styled.section`
    margin-top: -2rem;
    margin-left: -1rem;
    height: 50rem;
    /* background: gray; */
`;

export const BoardInfoWrapper = styled.section`
    display: flex;

    align-items: center;

    min-width: 3rem;
    min-height: 3rem;
    /* background: blue; */

    margin-bottom: 2rem;
`;

export const BoardUserImg = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    width: 3rem;
    height: 3rem;
    /* background: blue; */
    margin-left: 1rem;
`;

export const BoardUserName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 5rem;
    font-family: 'Jeju Gothic', sans-serif;

    /* background: gray; */
`;
export const BoardDate = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 5rem;
    font-family: 'Jeju Gothic', sans-serif;
    margin-left: 14rem;

    /* background: gray; */
`;

export const BoardTitleWrapper = styled.section`
    display: flex;
    flex-direction: row;

    min-width: 35rem;
    min-height: 3rem;
`;
export const BoardTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 5rem;
    font-family: 'Jeju Gothic', sans-serif;

    /* background: blue; */
`;
export const BoardTitleContainer = styled.div`
    width: 31.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 20px;

    font-family: 'Jeju Gothic', sans-serif;

    /* background: yellow; */
`;

export const BoardContentWrapper = styled.section`
    margin-top: 1rem;
    display: flex;
    flex-direction: row;

    min-width: 35.2rem;
    min-height: 14rem;

    /* background: blue; */
`;

export const BoardContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 5rem;

    font-family: 'Jeju Gothic', sans-serif;

    /* background: gray; */
`;
export const BoardContentContainer = styled.div`
    width: 31.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 20px;

    font-family: 'Jeju Gothic', sans-serif;

    /* background: red; */
`;
