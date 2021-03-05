import styled from 'styled-components';
import {Menu, Dropdown, Button} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

export const NavBarDiv=styled.div`
    z-index: 999;
    position: relative;
    width:100vw;
    justify-content:center;
    background-color:rgba(255,255,255,0.2);    
    perspective:1000px;
    margin:0 auto;
 
    #searchInput{
        display:none;
    }
`

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

export const UserDropDownMenuDiv=styled.div`
    margin-left:-5rem;    
    padding:10px 12px;
    border-radius:0.01rem;
    background-color:rgb(255, 255, 255);
    /* border:none */
    box-shadow: 1px 2px 40px #888888;
    .userMenuLabel{
        margin-right:6rem;        
    }
    .userMenuEmail{
        color:rgb(172, 172, 172);
        font-size:500;
        font-size:0.75rem;
        margin-top:-0.5rem;
    }
`

export const LogoutButton=styled(Button)`
    border:none;
    padding-left:0px;
    font-weight:600;
    color:chocolate;
    
`