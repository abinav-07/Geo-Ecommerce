import { Button, Col } from 'antd';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';

export const CustomizedButton = styled(Button)`
    text-decoration:none;
    border:none;    
`;

export const CustomGoogleLoginBtn = styled(GoogleLogin)`

border-radius:5%;
border-bottom:1px groove;
border-color:#2e6da4;
span{
    width:100%;    
    background-color:#87c0f5;
}    
@media only screen and (max-width: 768px) {
    width:100%;
}
`

export const DividerColumn = styled(Col)`
    text-align: center;
    padding: 2.3rem 0;
    @media only screen and (max-width: 800px) {
        padding: 1rem 0;
    }
`
