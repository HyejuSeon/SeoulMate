import styled from 'styled-components';

export const UploadResultWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;

    min-height: 100vh;
    min-width: 95vw;

    font-family: 'Jeju Gothic', sans-serif;

    /* background: yellow; */
`;

export const UploadResultLeft = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 45rem;
    height: 45rem;

    margin-left: 18rem;

    background: #ffffff;
    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852),
        0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01),
        0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185),
        0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481);
    /* border-radius: 26px; */
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

export const UploadResultContentContainer = styled.section`
    width: 35rem;
    height: 15rem;
    margin-bottom: 1rem;
    /* background-color: red; */
`;

export const UploadResultContentInfoTitle = styled.div`
    width: 35rem;
    height: 4rem;

    font-size: 0.6rem;

    background: #ffffff;
    margin-left: -1.6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`;

export const UploadResultContentInfo = styled.div`
    width: 35rem;
    height: 4rem;

    font-size: 1rem;

    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 100px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    /* background-color: blue; */
`;

export const UploadResultContentPeopleContainer = styled.section`
    width: 23rem;
    height: 3rem;

    margin-left: 12rem;
    margin-top: 2rem;
    /* background-color: yellow; */

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const UploadResultPeopleImg = styled.img`
    width: 2rem;
    height: 2rem;
    margin-left: 5rem;
`;

export const UploadResultBtnContainer = styled.div`
    width: 35rem;
    height: 7rem;
    margin-bottom: 1rem;
    /* background-color: grey; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

export const UploadResultBtn = styled.button`
    width: 10rem;
    height: 3rem;
    color: white;
    font-size: 1.2rem;
    background: #42403d;
    box-shadow: 0px 20px 35px rgba(241, 165, 1, 0.15);
    border-radius: 10px;
    cursor: pointer;
`;

export const UploadResultRight = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 55rem;
    height: 45rem;

    /* background: blue; */
`;

export const UploadResultNameContainer = styled.div`
    width: 45rem;
    height: 10rem;
    display: flex;
    align-items: center;
    /* background: red; */
`;

export const UploadResultNameImg = styled.img`
    width: 5rem;
    height: 5rem;
    margin-left: 5rem;
    padding-right: 2rem;
`;

export const UploadResultLocationContainer = styled.div`
    width: 45rem;
    height: 10rem;
    display: flex;
    align-items: center;
    /* background: white; */
`;

export const UploadResultLocationImg = styled.img`
    width: 5rem;
    height: 5rem;
    margin-left: 5rem;
    padding-right: 2rem;
`;

export const UploadResultDescriptionContainer = styled.div`
    width: 45rem;
    height: 10rem;
    display: flex;
    align-items: center;
    /* background: grey; */
`;

export const UploadResultDescriptionImg = styled.img`
    width: 5rem;
    height: 5rem;
    margin-left: 5rem;
    padding-right: 2rem;
`;
