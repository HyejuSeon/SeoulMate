import Style from 'styled-components'

function Footer(){
    return (
        <FooterDiv>
            <p>Copyrightⓒ2022 by 7 ai. All Page content is property of </p>
        </FooterDiv>
    )
}

export default Footer

const FooterDiv = Style.div`
    padding: 20px;
    text-align: center;
    margin-top: auto;
    background-color: #E4E4E4;
`;