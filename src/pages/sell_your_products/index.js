import { useState, useEffect } from 'react';
import { CustomTab, CustomTabPane } from './style';
import SellProductsTab from './components/sell_products_tab';
import SellerStoreTab from './components/your_store_tab';
import { getAllSellerProducts } from '../../redux';
import { useSelector, useDispatch } from 'react-redux';



const SellYourProductsPage = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.user?.user_id);
    const addingSellerProductsSuccess = useSelector(state => state.addSellerProducts?.addingSellerProductsSuccess);

    //Get Seller All Product Details
    useEffect(() => {
        dispatch(getAllSellerProducts(userId));
    }, [addingSellerProductsSuccess]);


    return (
        <CustomTab defaultActiveKey="1" >
            <CustomTabPane tab="Sell Products" key="1">
                <SellProductsTab />
            </CustomTabPane>
            <CustomTabPane tab="Your Store" key="2">
                <SellerStoreTab />
            </CustomTabPane>
            <CustomTabPane tab="Sold Products" key="3">
                Contents of Sold Products
            </CustomTabPane>
            <CustomTabPane tab="Orders" key="4">
                Contents of Orders
            </CustomTabPane>
        </CustomTab>
    )
}

export default SellYourProductsPage;