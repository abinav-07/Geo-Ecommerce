import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import { API_URL } from '../../config';
import { Input, notification, Button } from 'antd';
import ActiveInfoBar from './active_info_bar';
import Messages from './messages';
import { ChatDiv, ChatBoxDiv } from './style.js';
import OrderProduct from './order_product';
import axios from 'axios';

//Socket 
let socket;

/**
CAUTION: IMPORTANT MESSAGE:
Socket Room is Set From query Strings,
Current Message is associated with current user Id as key,
Current User is checked with message key user id to distinguish Users
**/

const ChatPage = () => {
    const history = useHistory();
    const [userId, setUserId] = useState('');
    const [currentUserId, setCurrentUserId] = useState();
    const [currentBuyerEmail, setCurrentBuyerEmail] = useState();
    const [currentSellerEmail, setCurrentSellerEmail] = useState();
    const [currentBuyerName, setCurrentBuyerName] = useState();
    const [currentSellerName, setCurrentSellerName] = useState();
    const [productId, setProductId] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState();
    const [isUserOnline, setIsUserOnline] = useState(false);

    const current_user_id = useSelector(state => state?.user?.user?.user_id);
    const current_user_email = useSelector(state => state?.user?.user?.email);

    const scrollElement = useRef(null);

    useEffect(() => {
        scrollElement.current.scrollIntoView({
            behavior: "smooth"
        })
    });

    useEffect(() => {
        setCurrentUserId(current_user_id);
    }, [current_user_id]);

    useEffect(() => {
        const { user_id, product_id, seller_id } = queryString.parse(history.location.search);

        socket = io(`${API_URL}`);

        //Setting Common Room for private messages
        setRoom(`${user_id}-${seller_id}-${product_id}`);


        setUserId(user_id);
        setProductId(product_id);
        setSellerId(seller_id);

        socket.emit('join', { current_user_id, user_id, seller_id, product_id }, ({ error }) => {
            notification.error({
                message: error,
                duration: 3
            })
        });

        // Unmounting
        return () => {
            socket.emit("disconnect", { current_user_id });
            socket.off();//One Instance of Socket off
        }
    }, [API_URL, history.location.search]);

    useEffect(() => {
        axios.get(`${API_URL}/users/chat-messages?room=${room}`)
            .then(res => {
                res?.data?.[0]?.["messages"]?.forEach(data => {
                    setMessages(messages => [...messages, { user_id: data.user_id, text: data.text }])
                })
            })
            .catch(err => {
                notification.error({
                    message: err.response?.data,
                    duration: 3
                })
            });
    }, [room])

    useEffect(() => {

        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        })
    }, []);

    useEffect(() => {

        axios.get(`${API_URL}/users/get-user-email?user_id=${userId}`).then(res => {
            setCurrentBuyerEmail(res.data?.email);
            setCurrentBuyerName(res.data?.first_name);
        }).catch(err => {
            console.log(err.response?.data?.message);
        });

        axios.get(`${API_URL}/users/get-user-email?user_id=${sellerId}`).then(res => {
            setCurrentSellerEmail(res.data?.email);
            setCurrentSellerName(res.data?.first_name);
        }).catch(err => {
            console.log(err.response?.data?.message);
        });


        //Seller Id to check if seller is online
        //Check current user id is equal to query user_id
        socket.on("online", (onlineUsersArr) => {
            if (currentUserId && currentUserId == userId) {
                onlineUsersArr.hasOwnProperty(sellerId) ? setIsUserOnline(true) : setIsUserOnline(false)
            } else if (currentUserId) {
                onlineUsersArr.hasOwnProperty(userId) ? setIsUserOnline(true) : setIsUserOnline(false)
            }
        });

        socket.on("offline", (onlineUsersArr) => {
            if (currentUserId && currentUserId == userId) {
                onlineUsersArr.hasOwnProperty(sellerId) ? setIsUserOnline(true) : setIsUserOnline(false)
            } else if (currentUserId) {
                onlineUsersArr.hasOwnProperty(userId) ? setIsUserOnline(true) : setIsUserOnline(false)
            }
        })
    }, [currentUserId, userId]);


    //Send Message
    const sendMessage = (event) => {
        event.preventDefault();

        setMessages(messages => [...messages, { user_id: currentUserId, text: message }])
        if (message) {
            socket.emit('privateMsg', { room, currentUserId, sellerId, productId, message }, () => setMessage(""));

            if (!isUserOnline) {
                let values;
                if (currentUserId == userId) {
                    //Sender is Buyer
                    //Receiver is Seller
                    values = {
                        senderEmail: `${currentBuyerName} <${currentBuyerEmail}>`,
                        receiverEmail: currentSellerEmail,
                        message: message
                    }
                } else {
                    //Receiver is Buyer
                    //Sender is Seller
                    values = {
                        senderEmail: `${currentSellerName} <${currentSellerEmail}>`,
                        receiverEmail: currentBuyerEmail,
                        message: message
                    }
                }

                axios.post(`${API_URL}/users/send-message-email`, values)
                    .then(res => {
                        notification.info({
                            message: "Message Emailed",
                            duration: 2
                        })
                    }).catch(err => {
                        console.log(err);
                    });
            }
        }
    }


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <ChatDiv>
                <OrderProduct userId={userId} productId={productId} sellerId={sellerId} />
                <ChatBoxDiv>
                    <ActiveInfoBar isUserOnline={isUserOnline} currentUserId={currentUserId} userId={userId} />
                    <Messages messages={messages} />
                    <div style={{ float: "left", clear: "both" }} ref={scrollElement} />
                    <div className="input-text-field">
                        <Input
                            placeholder="Enter Message Here..."
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null}
                        />
                        <Button type="primary" onClick={sendMessage}>Send</Button>
                    </div>

                </ChatBoxDiv>
            </ChatDiv>
        </div>
    )
}

export default ChatPage;