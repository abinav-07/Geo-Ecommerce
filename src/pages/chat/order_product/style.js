import styled from "styled-components";
import { Modal } from 'antd';

export const OrderProductDiv = styled.div`
    position:relative;
    
    background-image:radial-gradient(#f5d08c,#f5f2ed);
    border:2px solid white;
    border-radius:1rem;
    max-width:1000px;
   #product_name{
    font-family:cursive;
    }
    ul{
        padding-inline-start:20px;
    }
    li{
        list-style-type:circle;
    }
    h4{
        font-weight:600;
    }     
    
`;

export const PaymentModalModal = styled(Modal)`        
        
    
`;

export const PaymentTypeDiv = styled.div`
    border:1px solid grey; 
    margin:2px;
    width:400px;
    border-radius:1rem;
`