import { useState, useEffect, useRef } from 'react';
import { ChatBotDiv, ChatBotIcon, ChatDiv } from '../../style';
import { RobotOutlined, CloseOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../../config';

const ChatBot = () => {

    const [displayChatBot, setDisplayChatBot] = useState(false);
    const [text, setText] = useState("");
    const [chatMessages, setChatMessages] = useState([{
        "message": "Hi, How can i help you?",
        "class": "left"
    }])

    const scrollElement = useRef(null);

    useEffect(() => {
        if (displayChatBot) {
            scrollElement.current.scrollIntoView({
                behavior: "smooth"
            })
        }
    });

    useEffect(() => {
        axios.post(`${API_URL}/chat-bot/train-model`).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const Messages = ({ text, type }) => {
        return (
            <li className={`message ${type} appeared`}>
                {/*<div className="avatar"></div>*/}
                <div className="text_wrapper">
                    <div className="text">{text}</div>
                </div>
            </li>
        )

    };

    const handleSendOnClick = () => {
        let obj = {};
        obj.message = text;
        obj.class = "right";
        setChatMessages(messages => [...messages, obj]);
        setText("");

        axios.post(`${API_URL}/chat-bot/reply`, { userMessage: text })
            .then(res => {
                let replyObj = {};
                replyObj.message = res.data.reply;
                replyObj.class = "left";

                setChatMessages(messages => [...messages, replyObj]);
                setText("");
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <ChatBotDiv>
            {displayChatBot ?
                (
                    <ChatDiv>
                        <div className="chat-div-menu">
                            <div className="chat-title">SamanBot</div>
                        </div>
                        <ul className="messages">
                            {chatMessages.map((messageObj, index) => (
                                <Messages key={index} text={messageObj.message} type={messageObj.class} />
                            ))}
                            <div style={{ float: "left", clear: "both" }} ref={scrollElement} />
                        </ul>
                        <div className="input-text-field">
                            <Input
                                value={text}
                                placeholder="Enter Message Here..."
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                                onKeyPress={(event) => event.key === "Enter" ? handleSendOnClick() : null}
                            />
                            <Button type="primary" onClick={() => { handleSendOnClick() }}>Send</Button>
                        </div>
                    </ChatDiv>
                ) :
                ""
            }
            <ChatBotIcon
                onClick={() => { setDisplayChatBot(!displayChatBot) }}
            >
                {displayChatBot ?
                    (
                        <CloseOutlined style={{ color: "honeydew", width: "inherit" }} />
                    ) :
                    (
                        <RobotOutlined style={{ color: "honeydew", width: "inherit" }} />
                    )
                }

            </ChatBotIcon>
        </ChatBotDiv>
    )
}

export default ChatBot;