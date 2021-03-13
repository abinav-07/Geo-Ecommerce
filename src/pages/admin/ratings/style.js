import styled from "styled-components";

export const RatingDiv = styled.div`
    padding:100px 50px;
    text-align:right;
    #total-rating{
        font-size:3rem;
        margin-bottom:0.2rem;
    }

    #total-raters{
        margin-top:1rem;
        font-size:1.5rem;
    }
    
    .ant-rate{
        font-size:3rem;
    }

    .stars-label{
        font-size:1.5rem;
    }

    .rating-bar{
        font-size:1.5rem;
    }


    @media only screen and (max-width: 800px) {
        padding:20px;
        text-align:left;
        #total-rating{
            font-size:2rem;
            margin-bottom:0.2rem;
        }

        #total-raters{
            margin-top:1rem;
            font-size:1rem;
        }
    
        .ant-rate{
            font-size:1rem;
        }
        .stars-label{
            font-size:1.5rem;
            margin-bottom:-0.1rem;
        }
    }
`