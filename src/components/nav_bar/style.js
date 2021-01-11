import styled from 'styled-components';
import {Menu, Dropdown} from 'antd';
import {SearchOutlined} from '@ant-design/icons';


export const NavBarMenu=styled(Menu)`
    display:flex;  
    justify-content:space-between;
    .nav-bar-anchor{
        color:black;
        &:active{
            color:black;
        }
    }
`
export const MenuItem=styled(Menu.Item)`

`
export const SearchOutlinedEl=styled(SearchOutlined)`
    font-size:2.5rem;   
`

export const DropDownMenuDiv=styled.div`
    margin-left:-3rem;
    display:grid;
    grid-template-columns:auto auto;    
    grid-column-gap: 20px;    
    padding:10px;
    border:1px solid grey;
`
