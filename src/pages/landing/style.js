import styled from 'styled-components';
import { Image } from 'antd'


export const WelcomeDiv = styled.div`
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
        font-size:1.3rem;
        letter-spacing:0.1rem;        
        line-height:2.2rem;
        font-family:"Open Sans"
    }
    .welcome-span{        
        text-decoration:underline;
        text-decoration-thickness:10px;  
        text-decoration-color:${props => props.animatedbackgroundColor};
    }
`

export const PCBackgroundImg = styled(Image)`
    /* right:-50%; */
    position:relative;    
    margin-top:70%;
    margin-left:-40%;
    transform:scale(1.3);
`

export const RightBackGround = styled.div`
    background-color:${props => props.animatedbackgroundColor};
    position:absolute;  
    top:-50%;  
    height:150vh;
    width:100%;
`

export const BuyDiv = styled.div`
    background-color:${props => props.animatedbackgroundColor};
    /* position:absolute;   */
    /* margin-top:50%;   */
    border-radius:1rem;
    height:80vh;
    transform:rotate(40deg);
    /* width:100%; */
`

export const SellDiv = styled.div`
    background-color:${props => props.animatedbackgroundColor};
    /* position:absolute;   */
    border-radius:1rem;
    margin-top:40%;  
    height:80vh;
    @media only screen and (max-width: 1600px) {
        margin-top:60%;
}
    /* transform:rotate(40deg) */
    /* width:100%; */
`


export const LandingRightColumn = styled.div`
    width:100%;
    height:110vh;
    right:-58%;
    position:relative;
    transform:rotate(20deg);
`

export const HowSamanWorksMainDiv = styled.div`
    background-color:#FFFBF6;
    padding-top:6rem;

    img{
        width:200;
    }

    .how-it-works-title{
        color:#D41367;
        font-weight:600;
        font-size:1.5rem;
    }
    .how-it-works-info{
        font-size:2rem;
        font-weight:900;
        letter-spacing:0.1rem;
        margin-bottom:3rem;
    }
    .how-it-works-info-headers{
        font-size:1.1rem;
        font-weight:600;
        margin-top:1.5rem;
        margin-bottom:1rem;
    }
    .how-it-works-info-contents{
        font-size:1rem;
        text-align:center;
    }
`
