import styled from 'styled-components';
import {Image} from 'antd'


export const WelcomeDiv=styled.div`
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap");
    top:30%;
    position:relative;
    text-align:start;
    font-size:4rem;
    font-weight:900;
    letter-spacing:0.1rem;
    line-height: 72px;
    font-family:sans-serif;

    .welcome-div-text{
        text-align:justify;
        margin-top:1rem;
        font-size:1.2rem;
        letter-spacing:0.1rem;        
        line-height:1.5rem;
        font-family:"Open Sans"
    }
`

export const PCBackgroundImg=styled(Image)`
    /* right:-50%; */
    position:relative;    
    margin-top:80%;
    margin-left:-40%;
    transform:scale(1.3);
`

export const RightBackGround=styled.div`
    background-color:yellow;
    position:absolute;  
    top:-50%;  
    height:160vh;
    width:100%;
`

export const LandingRightColumn=styled.div`
    width:100%;
    height:100vh;
    right:-55%;
    position:relative;
    transform:rotate(20deg)
`