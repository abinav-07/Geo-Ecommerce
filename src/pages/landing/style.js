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
`;

export const ChatBotDiv = styled.div`

`;

export const ChatBotIcon = styled.div`    
    border-radius:50%;
    bottom:1rem;
    right:5rem;
    font-size:2.5rem;
    position:fixed;
    width:60px;
    height:60px;
    background-color:#1890ff;
`;

export const ChatDiv = styled.div`
    position:fixed;
    bottom:6rem;
    right:6rem;
    height:100%;
    width:100%;
    max-height:550px;
    max-width:450px;
    border:1px solid grey;    
    .input-text-field{       
        display:flex;
        flex-direction:row;        
        width: 100%;
        background-color:#fac950;
        padding: 20px 20px;
        position: absolute;
        bottom: 0;    
    }

    .messages {
        position: relative;
        list-style: none;
        padding: 20px 10px 0 10px;
        margin: 0;
        height: 430px;
        overflow-y: scroll;
        background-color: white;
    }

    .messages .message.appeared {
         opacity: 1;
    }

    .messages .message {
        clear: both;
        overflow: hidden;
        margin-bottom: 20px;
        transition: all 0.5s linear;
        opacity: 0;        
    }
    .messages .message.left .text_wrapper {
        background-color: #f5f8fa;
        float: left;        
        border-radius: 18px;
        width: 50%;
        padding:8px;        
        overflow-wrap:break-word;
    }

    .messages .message.right .text_wrapper {
        background-color: rgb(10, 91, 255);        
        color:white;
        float: right;
        border-radius: 18px;
        width: 50%;
        padding:8px;        
        overflow-wrap:break-word;
    }

    .chat-div-menu{
        background-color: #4242f5;
        width: 100%;
        padding: 10px 0;
        box-shadow: 0 1px 30px rgba(0, 0, 0, 0.1);
    }

    .chat-title{
        padding-left:10px;
        color: white;
        font-size: 20px;
    }
`;


