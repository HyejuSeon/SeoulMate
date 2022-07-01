import styled from 'styled-components';

export const MainContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const StartButton = styled.button`
    font-family: 'Jeju Gothic', sans-serif;
    box-sizing: border-box;

    position: absolute;
    width: 15rem;
    height: 5rem;
    margin-top: 25rem;
    justify-content: center;

    background: rgba(17, 1, 1, 0.5);

    border: 1px solid #e1f0fb;
    backdrop-filter: blur(1px);

    border-radius: 44px;
    cursor: pointer;

    font-size: 2rem;
    color: #e1f0fb;

    z-index: 10;
`;

export const StyledBurger = styled.button`
    position: absolute;
    top: 5%;
    left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    &:focus {
        outline: none;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background: ${({ open }) => (open ? '#0D0C1D' : '#EFFFFA')};
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;

        :first-child {
            transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
        }

        :nth-child(2) {
            opacity: ${({ open }) => (open ? '0' : '1')};
            transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
        }

        :nth-child(3) {
            transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
        }
    }
`;

export const BurgerMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #effffa;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    height: 100vh;
    text-align: left;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;

    @media (max-width: 576px) {
        width: 100%;
    }

    a {
        font-size: 2rem;
        text-transform: uppercase;
        padding: 2rem 0;
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: #0d0c1d;
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: 576px) {
            font-size: 1.5rem;
            text-align: center;
        }

        &:hover {
            color: #343078;
        }
    }
`;

export const FirstPage = styled.section`
    height: 100vh;
    display: flex;
    font-family: 'Jeju Gothic', sans-serif;
`;

export const PhotoContainer = styled.div`
    width: 100%;
    display: block;
    position: relative;

    &:before {
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        opacity: 0.4;
        position: absolute;
        z-index: 5;
    }
`;

export const HeadCopy = styled.div`
    font-size: 2rem;

    color: white;

    line-height: 60px;
    position: absolute;
    justify-content: center;

    z-index: 10;
`;

export const SecondPage = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Jeju Gothic', sans-serif;
`;

export const SecondPageHeadCopy = styled.section`
    font-size: 2.9rem;
    border-bottom: solid;

    color: #373737;
    line-height: 80px;
    font-weight: bold;
    margin-bottom: 5%;

    font-family: 'Jeju Gothic', sans-serif;
`;

export const SecondPageBodyCopy = styled.section`
    font-size: 1.7rem;
    margin-top: 5%;
    color: #373737;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
`;

export const SecondPageBodyCopy2 = styled.section`
    font-size: 1.7rem;
    margin-top: 4%;
    margin-bottom: 3%;
    color: #373737;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
`;

export const StartButton2 = styled.button`
    font-family: 'Jeju Gothic', sans-serif;
    box-sizing: border-box;

    position: relative;
    width: 14rem;
    height: 4rem;

    background: black;
    border: 2px solid #ffffff;

    border-radius: 60px;
    cursor: pointer;

    font-size: 1.5rem;
    color: white;

    margin-bottom: 5%;
`;

export const ThirdPage = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #d2eef6;
    font-family: 'Nanum Gothic', sans-serif;
`;

export const ThirdPageHeadCopy = styled.section`
    font-size: 2.9rem;
    border-bottom: solid;

    color: #373737;
    line-height: 80px;
    font-weight: bold;
    margin-top: 7%;
    margin-bottom: 5%;
`;

export const ThirdPageContentContainer = styled.section`
    width: 60%;
    display: flex;

    flex-wrap: wrap;

    margin-left: 6%;

    margin-bottom: 5%;
`;
export const ThirdPageImgContainer = styled.a`
    width: 528px;
    height: 295px;
    cursor: pointer;

    &:hover {
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        opacity: 0.6;
    }
`;

export const ThirdPageContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-right: 20px;
`;
export const ThirdPageContentDescription = styled.div`
    width: 525px;
    font-size: 1rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
    /* 
    display: flex;
    align-items: center;
    justify-content: center; */

    color: #373737;
    line-height: 20px;
    font-weight: bold;
`;
export const ThirdPageContentDescription2 = styled.div`
    font-size: 1.4rem;

    color: #373737;
    line-height: 80px;
    font-weight: bold;

    display: inline-flex;
`;

export const ThirdPageContentUserInfo = styled.div`
    width: 10rem;
    height: 3rem;

    background: #d85d5d;
    font-size: 0.8rem;
    font-weight: bold;

    color: #373737;

    margin-bottom: 5%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ThirdPageContentLocationInfo = styled.div`
    width: 23rem;

    margin-left: 2%;
    margin-top: -5%;

    font-size: 0.8rem;

    color: black;

    display: inline-flex;

    align-items: center;
`;

export const FourthPage = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    font-family: 'Jeju Gothic', sans-serif;
`;

export const FourthPageHeadCopy = styled.section`
    font-size: 2.9rem;
    border-bottom: solid;

    color: #373737;
    line-height: 80px;
    font-weight: bold;
    margin-top: 7%;
    margin-bottom: 5%;

    text-align: center;
`;

export const FourthPageBodyCopy = styled.section`
    font-size: 1.7rem;
    margin-top: 2%;
    margin-bottom: 5%;
    color: #373737;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
`;

export const FourthPageMapContainer = styled.div`
    width: 1140px;
    height: 640px;

    background-color: black;

    margin-bottom: 100px;
`;
