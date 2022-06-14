import styled from 'styled-components';

export const UploadResultWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;

    min-height: 100vh;
    min-width: 95vw;

    background: yellow;
`;

export const UploadResultLeft = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 55rem;
    height: 45rem;

    background: black;
`;

export const ImgContainer = styled.img`
    width: 35rem;
    height: 20rem;
    margin-top: 3rem;
    padding-bottom: 3rem;
    object-fit: cover;
    /* &:hover {
        cursor: pointer;
        opacity: 0.8;
    } */
`;

export const UploadResultContent = styled.div`
    width: 35rem;
    height: 15rem;
    margin-bottom: 1rem;
    background-color: red;
`;

export const UploadResultBtnContainer = styled.div`
    width: 35rem;
    height: 7rem;
    margin-bottom: 1rem;
    background-color: grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

export const UploadResultBtn = styled.button`
    width: 10rem;
    height: 3rem;

    background: #42403d;
    box-shadow: 0px 20px 35px rgba(241, 165, 1, 0.15);
    border-radius: 10px;
    cursor: pointer;
`;

export const UploadResultRight = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 55rem;
    height: 45rem;

    background: blue;
`;

export const UploadResultNameContainer = styled.div`
    width: 45rem;
    height: 15rem;

    background: white;
`;

export const UploadResultNameImg = styled.img`
    width: 5rem;
    height: 5rem;
`;

export const UploadResultLocationContainer = styled.div`
    width: 45rem;
    height: 15rem;

    background: white;
`;

export const UploadResultLocationImg = styled.img`
    width: 5rem;
    height: 5rem;
`;

export const UploadResultDescriptionContainer = styled.div`
    width: 45rem;
    height: 15rem;

    background: white;
`;

export const UploadResultDescriptionImg = styled.img`
    width: 5rem;
    height: 5rem;
`;
