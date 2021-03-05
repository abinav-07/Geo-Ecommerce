import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainProductsLayout from './components/main_layout';
import { useParams } from 'react-router-dom';

import { getAllProducts } from '../../redux';
import { message } from 'antd';
import { getProductType } from "../../utils/product_type";
import { PRODUCT_TYPES, SELL_YOUR_PRODUCTS_PRODUCT_TYPES } from '../../enums';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { product_type } = useParams();

    const [products, setProducts] = useState([]);
    const [productHeader, setProductHeader] = useState();

    const user_id = useSelector(state => state.user.user?.user_id);
    const gettingAllProductsError = useSelector(state => state.allProducts?.gettingAllProductsError);
    const allProducts = useSelector(state => state.allProducts?.allProducts);

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

        //Get Type From param to match with data from database 
        const getProductTypeFromParam = getProductType(product_type);
        if (getProductTypeFromParam == PRODUCT_TYPES.NEW_PRODUCTS) {
            productHeader = "New Products";
            filteredProducts = allProducts?.filter(item => item?.is_used_product === true);
        } else if (getProductTypeFromParam == PRODUCT_TYPES.OLD_PRODUCTS) {
            productHeader = "Old Products";
            filteredProducts = allProducts?.filter(item => item?.is_used_product === false);
        } else if (getProductTypeFromParam == PRODUCT_TYPES.ALL_PRODUCTS) {
            productHeader = "All Products";
            filteredProducts = allProducts ? allProducts : [];
        } else {
            productHeader = SELL_YOUR_PRODUCTS_PRODUCT_TYPES?.filter(type => type.value == getProductTypeFromParam)?.[0]?.["name"];
            filteredProducts = allProducts?.filter(item => item?.product_type == getProductTypeFromParam);
        }
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