import { useState } from 'react';
import { CustomTab, CustomTabPane } from './style';
import SellProductsTab from './components/sell_products_tab';
import SellerStoreTab from './components/your_store_tab';



const SellYourProductsPage = () => {

    // //Handle Active Key
    // const handleOnChange = (key) => {

    // }

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