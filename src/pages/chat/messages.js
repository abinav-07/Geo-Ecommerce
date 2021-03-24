import { LeftCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Messages = ({ message: { user_id, text } }) => {
    const current_user_id = useSelector(state => state?.user?.user?.user_id)

    let isSentByCurrentUser = false;
    
    if (user_id == current_user_id) {
        isSentByCurrentUser = true;
    }

    return (
        <>
            {isSentByCurrentUser?
            (
            <div>
                <p style={{                    
                    float:"right",
                    backgroundColor:"#f5f6f7",
                    borderRadius: "18px",
                    width: "50%",
                    padding:"10px"
                }}>{text}</p>
            </div>
        )
        :
        (
            <div>
                <p style={{                    
                    float:"left",
                    backgroundColor:"#74b6f7",
                    borderRadius: "18px",
                    width: "50%",
                    padding:"10px"
                }}>{text}</p>
            </div>
        )}
        </>
    )

}

const AllMessages=({messages})=>(
    <div>
        {messages?.map((message,i)=>(            
            <div key={i} style={{display:"inline-block", width:"100%"}}><Messages message={message}/></div>
        )            
        )}
    </div>
    
)

export default AllMessages;