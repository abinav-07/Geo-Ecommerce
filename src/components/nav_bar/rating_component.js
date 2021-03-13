import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message, Modal, notification, Rate } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { getToken } from '../../utils/storage';
import axios from 'axios';
import { API_URL } from '../../config';
import { onUserRatingUpdate } from '../../redux';

const RatingComponent = () => {
    const dispatch = useDispatch();
    //States
    const [displayRatingModalBool, setDisplayRatingModalBool] = useState(false);
    const [userRating, setUserRating] = useState(null);

    const User = useSelector(state => state.user?.user);

    useEffect(() => {
        setUserRating(User?.application_rating ? parseInt(User.application_rating) : null);
        console.log(User?.application_rating);
        console.log(userRating);
    }, [User]);

    const handleOnClick = () => {
        if (!getToken()) {
            message.info("You must login to rate!");
        } else {
            setDisplayRatingModalBool(true);
        }
    }

    const updateRating = () => {
        axios.post(`${API_URL}/users/update-application-rating`, {
            user_id: User?.user_id,
            application_rating: userRating
        }).then(res => {
            notification.success({
                message: res.data,
                duration: 3
            });
            dispatch(onUserRatingUpdate(userRating));
            setDisplayRatingModalBool(false);
        }).catch(err => {
            notification.error({
                message: err.response.data.message,
                duration: 3
            });
        })
    }

    const handleModalCancel = () => {
        setUserRating(User?.application_rating ? parseInt(User.application_rating) : null);
        setDisplayRatingModalBool(false);
    }

    const handleRateChange = (number) => {
        setUserRating(number);
    }

    return (
        <div>
            <div onClick={handleOnClick}>
                <div>
                    <SmileOutlined style={{ cursor: "pointer", fontSize: "2.5rem" }} />
                </div>
                <div>
                    Rating
            </div>
            </div>
            <Modal
                title="Rate Application"
                visible={displayRatingModalBool}
                onOk={updateRating}
                onCancel={handleModalCancel}
                maskClosable={false}
                style={{
                    textAlign: "center"
                }}
            >
                <p>Rate the Application.</p>
                <Rate value={userRating} onChange={handleRateChange} />
            </Modal>
        </div>
    )
};

export default RatingComponent;