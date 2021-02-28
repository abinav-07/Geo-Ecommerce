import styled from "styled-components";

export const SellProductsMainDiv = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    
    #sellProductsForm{
        width:80%;
        margin:30px 0px;        
    }
    label{
        font-size:1rem;
    }
    .ant-form-item{
        margin:20px 0px;
    }
    h1{
        font-size:1.2rem;
        font-weight:600;
    }
    table > thead > tr > th{
        font-weight:600;
    }
    
    @media only screen and (max-width: 800px) {
        button{
            margin:10px 0px;
            width:100%;
        }
        
    }
    
`