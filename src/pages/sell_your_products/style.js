import styled from 'styled-components';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const CustomTab = styled(Tabs)`
    padding:20px;
    margin:150px 200px;
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
    padding:40px 10px;
    border:1px solid #ededed;
`