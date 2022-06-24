import styled from 'styled-components';

export const BoardContentContainer = styled.a`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 32rem;
    height: 45rem;
    margin: 2rem;
    margin-bottom: 3rem;

    background: #ffffff;
    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852),
        0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01),
        0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185),
        0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481);
    border-radius: 26px;
`;

export const ImgContainer = styled.img`
    width: 28rem;
    height: 15rem;

    object-fit: cover;
    border-radius: 3rem;
    cursor: pointer;

    &:hover {
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        opacity: 0.7;
    }
`;

export const UploadResultContentContainer = styled.section`
    width: 35rem;
    height: 15rem;
    /* margin-bottom: 1rem; */
    margin-top: 1rem;

    display: flex;
    flex-direction: column;
`;

export const UploadResultContentPeopleContainer = styled.section`
    width: 23rem;
    height: 3rem;

    margin-left: 5.5rem;
    margin-top: 2rem;
    /* background-color: yellow; */

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const UploadResultPeopleImg = styled.img`
    width: 2rem;
    height: 2rem;
    margin-left: 4rem;
`;

export const UploadResultNameContainer = styled.div`
    width: 45rem;
    height: 10rem;
    display: flex;
    align-items: center;
    /* background: red; */
`;

export const UploadResultNameImg = styled.img`
    width: 3rem;
    height: 3rem;
    margin-left: 3.4rem;
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
    width: 3rem;
    height: 3rem;
    margin-left: 3.4rem;
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
    width: 3rem;
    height: 3rem;
    margin-left: 3.4rem;
    padding-right: 2rem;
`;
