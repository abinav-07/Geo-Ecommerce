import { useSelector, useDispatch } from 'react-redux';
import { MessageOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { MessageDropDownMenuDiv } from './style';
import { getToken } from '../../utils/storage';
import { Link } from 'react-router-dom';

const MessageDropDown = () => {
    const User = useSelector(state => state?.user?.user);




    const MessageDropDownDiv = () => {
        return (
            <MessageDropDownMenuDiv>
                {User?.message_rooms?.length > 0 ?
                    (
                        User?.message_rooms?.map((data, index) => (
                            data?.messages?.length > 0 ?
                                (
                                    <div
                                        key={index}
                                        className="message-div"
                                        style={{ borderBottom: "2px solid grey", cursor: "pointer" }}
                                    >
                                        <Link
                                            onClick={() => {
                                                //Setting User Token to storage
                                                const userToken = getToken();
                                                localStorage.setItem("user", userToken);
                                            }}
                                            to={`/chat?user_id=${data?.user_id}&product_id=${data?.product_id}&seller_id=${data?.seller_id}`}
                                            target="_blank"
                                        >
                                            <div>
                                                <span style={{color:"grey"}}>Product: </span><span className="product-name">{data?.Product?.["product_name"]}</span>
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <span className="message-sender">
                                                    {User?.user_id == data?.messages?.[0]["user_id"] ?
                                                        <p>You:</p>
                                                        :
                                                        <p>{data?.messages?.[0]["User"]?.first_name}</p>
                                                    }
                                                </span>
                                                <span className="message">{data?.messages?.[data?.messages?.length - 1]["message"]}</span>
                                            </div>
                                        </Link>

                                    </div>
                                ) :
                                ""
                        ))
                    )
                    : (
                        <div>
                            No Messages
                        </div>
                    )

                }
            </MessageDropDownMenuDiv >
        );
    }

    return (
        <div>
            <Dropdown
                overlay={<MessageDropDownDiv />}
                trigger={["click"]}
                style={{
                    pointer: "cursor"
                }}
            >
                <div>
                    <div>
                        <MessageOutlined style={{ cursor: "pointer", fontSize: "2.5rem" }} />
                    </div>
                    <div>
                        Messages
                    </div>
                </div>

            </Dropdown>
        </div>
    )
}

export default MessageDropDown;