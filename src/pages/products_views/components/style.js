import { List, Card, Modal } from 'antd';
import styled from "styled-components";

export const PageLayout = styled.div`
    background-image:linear-gradient(#fac950,#ebe07f);
    margin:50px 200px;
    padding:5px;
    /* height:100vh; */
    border-radius:2rem;
    @media only screen and (max-width: 1500px) {
        margin:50px 20px;
    }
    @media only screen and (max-width: 800px) {
        margin:0px;
    }
`;

export const MainDiv = styled.div`
    padding:20px;
    margin:50px;
    border-radius:2rem;
    border:5px solid white;
    /* background-color:#f5ebb0; */
    background-color:#f7d89e;

    h1{
        font-weight:600;
        text-align:center;
        padding:20px;
        font-family:cursive;
        font-size:2rem;
    }

    @media only screen and (max-width: 1500px) {
        margin:50px 20px;
    }
    @media only screen and (max-width: 800px) {
        margin:0px;
    }
`;

export const ListDiv = styled(List)`
    
    
`;
export const ListItemDiv = styled(List.Item)`        
    display:flex !important;
    justify-content:center; 
`;

export const CardDiv = styled(Card)`
    text-align:center;
    padding:5px;    
    border:2px solid white;
    border-radius:1rem;
    background-image:radial-gradient(#f5d08c,#f5f2ed);
    width:380px;
    height:450px;
    margin:20px 0px;
    img{
        width:300px;
        height:200px;
    }
    h2{
        color:#7834ba;
        font-weight:900;
        margin-bottom:0
    }
    .card-contents{
        margin:2px;
        padding:5px;
        border:1px solid white;
        border-radius:1rem;
    }
    .product-price{
        color:#919091;
        font-weight:900;
        font-size:1.2rem;
    }
    .product-delivery-time{
        font-size:1rem;
        font-weight:900;
    }
    .expandable-icon{
        font-size:1.4rem;
        border:1px dashed black;
        font-weight:600;
        border-radius:20px;
        padding:4px;
    }
`

export const ProductModalDiv=styled(Modal)`
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
`