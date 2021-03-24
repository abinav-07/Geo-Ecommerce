import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { ActiveInfoDiv } from './style.js';

const ActiveInfoBar = ({ isUserOnline, currentUserId, userId }) => {
    return (
        <div>
            <ActiveInfoDiv>
                {isUserOnline ?
                    <CheckCircleOutlined
                        style={{
                            color: "#51b320",
                            fontSize: "1.5rem",
                            paddingRight: "10px"
                        }}
                    />
                    :
                    <CloseCircleOutlined
                        style={{
                            color: "#737572",
                            fontSize: "1.5rem",
                            paddingRight: "10px"
                        }}
                    />
                }

                <div>
                    {
                        (currentUserId && currentUserId == userId) ?
                            <span>Seller is {isUserOnline ? 'Online' : 'Offline'}</span>
                            :
                            <span>Buyer is {isUserOnline ? 'Online' : 'Offline'}</span>
                    }
                </div>
            </ActiveInfoDiv>
        </div>
    )
};

export default ActiveInfoBar;