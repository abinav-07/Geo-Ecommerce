import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainProductsLayout from './components/main_layout';
import { useParams } from 'react-router-dom';

import { getAllProducts } from '../../redux';
import { message } from 'antd';
import { getProductType } from "../../utils/product_type";
import { PRODUCT_TYPES, SELL_YOUR_PRODUCTS_PRODUCT_TYPES } from '../../enums';
import { timeConverter, AVERAGE_BIKE_SPEED, getLatLongDistance } from '../../utils/harvesine_calculator';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { product_type } = useParams();

    const [products, setProducts] = useState([]);
    const [productHeader, setProductHeader] = useState();

    const user_id = useSelector(state => state.user?.user?.user_id);
    const gettingAllProductsError = useSelector(state => state.allProducts?.gettingAllProductsError);
    const allProducts = useSelector(state => state.allProducts?.allProducts);


    const user_latitude = useSelector(state => state?.user?.user?.latitude ? parseFloat(state?.user?.user?.latitude) : "");
    const user_longitude = useSelector(state => state?.user?.user?.longitude ? parseFloat(state?.user?.user?.longitude) : "");


    useEffect(() => {
        dispatch(getAllProducts(user_id));
    }, []);


    //Error Message Effects
    useEffect(() => {
        {
            gettingAllProductsError &&
                message.error(gettingAllProductsError)
        }
    }, [gettingAllProductsError]);

    useEffect(() => {
        let filteredProducts;
        let productHeader;
        let time_for_delivery_in_hours;

        //Adding Time Distance
        for (let i = 0; i < allProducts?.length; i++) {

            let productLat = allProducts ? allProducts[i]["user_detail"]["address"]["latitude"] : null;
            let productLong = allProducts ? allProducts[i]["user_detail"]["address"]["longitude"] : null;
            const distance = getLatLongDistance(productLat, productLong, user_latitude, user_longitude);
            if (distance) {
                time_for_delivery_in_hours = timeConverter((distance / AVERAGE_BIKE_SPEED) * 60); //In Minutes
            } else {
                time_for_delivery_in_hours = "Cannot Estimate";
            }


            allProducts[i]["product_distance"] = distance;
            allProducts[i]["time_for_delivery_in_hours"] = time_for_delivery_in_hours;

        }

        //Get Type From param to match with data from database 
        const getProductTypeFromParam = getProductType(product_type);
        if (getProductTypeFromParam == PRODUCT_TYPES.NEW_PRODUCTS) {
            productHeader = "New Products";
            filteredProducts = allProducts?.filter(item => item?.is_used_product === false);
        } else if (getProductTypeFromParam == PRODUCT_TYPES.OLD_PRODUCTS) {
            productHeader = "Old Products";
            filteredProducts = allProducts?.filter(item => item?.is_used_product === true);
        } else if (getProductTypeFromParam == PRODUCT_TYPES.ALL_PRODUCTS) {
            productHeader = "All Products";
            filteredProducts = allProducts ? allProducts : [];
        } else {
            productHeader = SELL_YOUR_PRODUCTS_PRODUCT_TYPES?.filter(type => type.value == getProductTypeFromParam)?.[0]?.["name"];
            filteredProducts = allProducts?.filter(item => item?.product_type == getProductTypeFromParam);
        }

        filteredProducts.sort((a, b) => {
            return parseFloat(a?.product_distance) - parseFloat(b?.product_distance);
        })

        setProductHeader(productHeader);
        setProducts(filteredProducts);

    }, [allProducts, product_type]);

    return (
        <div>
            <MainProductsLayout allProducts={products} productHeader={productHeader} />
        </div>
    )
}
export default ProductsPage;