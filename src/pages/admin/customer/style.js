import { Button } from "antd";
import styled from "styled-components";

export const ActionDiv = styled.div`
    display:flex;
    justify-content:space-evenly;
`;

export const CustomerProductButton = styled(Button)`
    background-color:none;    
`;

export const CustomerDetails = styled.div`
    thead>tr:first-child{
        font-size:1.5rem;        
    }
`;
