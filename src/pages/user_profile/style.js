import styled from "styled-components";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const PageLayout = styled.div`
    background-image:linear-gradient(#fac950,#ebe07f);
    /* margin:50px 200px; */
    padding:5px;
    /* height:100vh; */
    border:1px solid grey;
    border-radius:2rem;  
    
`;


export const MainDiv = styled.div`
    padding:20px;
    margin:10px;
    border-radius:2rem;    
    /* background-color:#f5ebb0;     */
    background-color:#fff;    

    .form-labels{
        font-size:1.4rem;
        font-weight:600;
        margin-left:10vw;
        margin-bottom:2rem;
    }
    

    @media only screen and (max-width: 1500px) {
        margin:50px 20px;
    }
    @media only screen and (max-width: 800px) {
        margin:0px;
        .form-labels{
            margin-left:0%;
        }
    }
`;


export const CustomTab = styled(Tabs)`
    padding:20px;
    margin:50px 200px;
    background-color:#fcf6ed;
    border-radius:2rem;
    .ant-tabs-tab {
        padding:10px 20px;
    }
    @media only screen and (max-width: 1500px) {
        margin:50px 20px;
    }
    @media only screen and (max-width: 800px) {
        margin:0px;
    }
`

export const CustomTabPane = styled(TabPane)`
    padding:10px;
    border:1px solid #ededed;
`