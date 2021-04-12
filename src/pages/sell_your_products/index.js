import { useState, useEffect } from 'react';
import { CustomTab, CustomTabPane } from './style';
import SellProductsTab from './components/sell_products_tab';
import SellerStoreTab from './components/your_store_tab';
import SellerOrderTab from './components/orders_tab';
import SoldProductsTab from './components/sold_products_tab';
import { getAllSellerProducts, getAllOrderDetails } from '../../redux';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';


const SellYourProductsPage = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.user?.user_id);
    const addingSellerProductsSuccess = useSelector(state => state.addSellerProducts?.addingSellerProductsSuccess);
    const gettingAllOrderDetailsError = useSelector(state => state?.sellerAllProducts?.gettingAllOrderDetailsError);

    //Get Seller All Product Details
    useEffect(() => {
        dispatch(getAllSellerProducts(userId));
        dispatch(getAllOrderDetails(userId));
    }, [addingSellerProductsSuccess]);

    useEffect(() => {
        if (gettingAllOrderDetailsError) {
            notification.error({
                message: gettingAllOrderDetailsError,
                duration: 3
            })
        }

    }, [gettingAllOrderDetailsError])

    return (
        <CustomTab defaultActiveKey="1" >
            <CustomTabPane tab="Sell Products" key="1">
                <SellProductsTab />
            </CustomTabPane>
            <CustomTabPane tab="Your Store" key="2">
                <SellerStoreTab />
            </CustomTabPane>
            <CustomTabPane tab="Sold Products" key="3">
                <SoldProductsTab />
            </CustomTabPane>
            <CustomTabPane tab="Orders" key="4">
                <SellerOrderTab />
            </CustomTabPane>
        </CustomTab>
    )
}

export default SellYourProductsPage;