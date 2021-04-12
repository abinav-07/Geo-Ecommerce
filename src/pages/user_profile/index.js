import { PageLayout, MainDiv, CustomTab, CustomTabPane } from "./style";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { API_URL } from "../../config";
import UserPersonalInformationTab from './personal_information';
import UserOrdersTab from './orders';

const UserProfile = () => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.user?.user);
    return (
        <CustomTab defaultActiveKey="1">
            <CustomTabPane tab="Personal Information" key="1">
                <UserPersonalInformationTab />
            </CustomTabPane>
            <CustomTabPane tab="Your Orders" key="2">
                <UserOrdersTab />
            </CustomTabPane>
        </CustomTab>
    )
}

export default UserProfile;