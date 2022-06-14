import styled from 'styled-components';

export const UploadWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    min-width: 95vw;

    background: black;
`;

export const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const UploadPlaceholder = styled.div`
    align-items: center;
    border-radius: 1.25rem;
    border: 1px dashed #fff;
    color: #fff;
    display: flex;
    font-size: 1.25rem;
    font-weight: 600;
    justify-content: center;
    margin-bottom: 1rem;
    max-height: 15rem;
    max-width: 15rem;
    min-height: 15rem;
    min-width: 15rem;
    padding: 5rem;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;
export const UploadContent = styled.img`
    border-radius: 1.25rem;
    height: 15rem;
    margin-bottom: 1rem;
    object-fit: cover;
    width: 15rem;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const UploadButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    position: absolute;
    margin-top: 30rem;
`;

export const UploadButton = styled.button`
    box-sizing: border-box;

    /* position: absolute; */
    width: 8rem;
    height: 3rem;

    /* margin-top: 35rem; */
    margin-right: 3rem;

    background: rgba(17, 1, 1, 0.5);

    border: 1px solid #e1f0fb;

    border-radius: 44px;
    cursor: pointer;

    font-size: 1rem;
    color: #e1f0fb;

    &:hover {
        color: #ffff;
        opacity: 0.5;
    }
`;
export const UploadCancelButton = styled.button`
    box-sizing: border-box;

    /* position: absolute; */
    width: 8rem;
    height: 3rem;

    /* margin-top: 35rem; */

    background: rgba(17, 1, 1, 0.5);

    border: 1px solid #e1f0fb;

    border-radius: 44px;
    cursor: pointer;

    font-size: 1rem;
    color: #e1f0fb;

    &:hover {
        color: #ffff;
        opacity: 0.5;
    }
`;
