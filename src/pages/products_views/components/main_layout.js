import { useSelector } from 'react-redux';
import { Image } from 'antd';
import { ExpandAltOutlined, ExpandOutlined } from '@ant-design/icons';
import { PageLayout, MainDiv, ListDiv, CardDiv, ListItemDiv } from './style';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import ProductModal from './product_modal';


const MainProductsLayout = ({ allProducts, productHeader }) => {

    const [searchInputText, setSearchInputText] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    //Set Selected Product States
    const [selectedProduct, setSelectedProduct] = useState();
    const [openProductModalBool, setOpenProductModalBool] = useState(false);

    const gettingAllProducts = useSelector(state => state.allProducts?.allSellerProducts);

    useEffect(() => {
        setProducts(allProducts);
        setFilteredProducts(allProducts);
    }, [allProducts]);

    useEffect(() => {
        let filteredSearchProducts;
        //Filter based on all types
        filteredSearchProducts = products?.filter(product => {
            if (product.product_name.toLowerCase().includes(searchInputText) ||
                product.product_type.toLowerCase().includes(searchInputText) ||
                product.product_sub_type.toLowerCase().includes(searchInputText) ||
                product.product_price.toString().toLowerCase().includes(searchInputText)
            ) {
                return product;
            }
        });

        //Filter in Order of Product Distance
        filteredSearchProducts.sort((a, b) => {
            return parseFloat(a?.product_distance) - parseFloat(b?.product_distance);
        });

        setFilteredProducts(filteredSearchProducts);

    }, [searchInputText])

    const displaySearchInput = () => {
        $("#searchIconDiv").hide();
        $("#searchInput").show();
        $("#searchInput").focus();
    };

    const hideSearchInput = () => {
        $("#searchIconDiv").show();
        $("#searchInput").hide();
    };

    const handleSearchInputChange = (event) => {
        let searchValue = $("#searchInput").val().toLowerCase();
        setSearchInputText(searchValue);
    }

    $("#searchInput").on("input", () => {
        handleSearchInputChange();
    });

    //JQUERIES
    $("#searchIconDiv").on("click", () => {
        displaySearchInput();
    });

    $("#searchInput").on("focusout", () => {
        hideSearchInput();
    });


    //Set Selected Products
    const productOnClickHandler = (selectedItem) => {
        setOpenProductModalBool(true);
        setSelectedProduct(selectedItem)
    }

    return (
        <PageLayout>
            <MainDiv>
                <h1>{productHeader}</h1>
                <ListDiv
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 4,
                        xl: 2,
                        xxl: 3,
                    }}
                    loading={gettingAllProducts}
                    dataSource={filteredProducts}
                    pagination={{
                        pageSize: 10,
                    }}
                    renderItem={(item, i) => {

                        return (
                            <ListItemDiv>
                                <CardDiv
                                    hoverable={true}
                                    extra={<ExpandAltOutlined className="expandable-icon" onClick={() => productOnClickHandler(item)} />}
                                    cover={<Image
                                        key={i}
                                        preview={false}
                                        src={require(`../../../assests/images/product_images/${item?.product_images ? item?.product_images[0]["image"] : ""}`).default}
                                        alt={item?.product_name}
                                    />}
                                >
                                    <div className="card-contents">
                                        <div>
                                            <h2>{item?.product_name}</h2>
                                        </div>
                                        <div>
                                            <p className="product-delivery-time">Estimated Delivery Time: {item?.time_for_delivery_in_hours}</p>

                                        </div>
                                        <div>
                                            <p className="product-price">$ {item?.product_price}</p>
                                        </div>
                                    </div>
                                </CardDiv>
                            </ListItemDiv>
                        )
                    }}
                />
                <ProductModal
                    openProductModalBool={openProductModalBool}
                    setOpenProductModalBool={setOpenProductModalBool}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />

            </MainDiv>
        </PageLayout>
    )
}

export default MainProductsLayout;