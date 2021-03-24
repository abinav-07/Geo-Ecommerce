import styled from "styled-components";

export const ChatDiv=styled.div`
    position:relative;    
    width:calc(100%);
    max-width:800px;
    margin-top:2%;
`

export const ChatBoxDiv = styled.div`
    background-color:#bdcfd9;
    height:600px;
    border-radius:4px;           
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    .input-text-field{
        display:flex;
        flex-direction:row;
        position: relative;
        width: 100%;
        background-color:#fac950;
        padding: 20px 20px;
        position: absolute;
        bottom: 0;
    }
`;

export const ActiveInfoDiv = styled.div`
    display:flex;
    flex-direction:row;
    border-bottom:1px solid #a1a3a0;
    padding:10px;
    justify-content:center;
    margin-bottom:20px;
`