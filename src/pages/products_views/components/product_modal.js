import { useSelector } from 'react-redux';
import { Row, Col, Modal, Button } from "antd";
import { select } from "async";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";
import { ProductModalDiv } from './style';
import { getToken } from '../../../utils/storage';


const ProductModal = ({
    openProductModalBool,
    setOpenProductModalBool,
    selectedProduct,
    setSelectedProduct
}) => {

    const user_id = useSelector(state => state?.user?.user?.user_id);

    const handleCloseModal = () => {
        setOpenProductModalBool(false);
        setSelectedProduct(null);
    }
    console.log(selectedProduct);

    const imageGalleryProps = {
        items: selectedProduct ? selectedProduct.product_images?.map((data, i) => (
            {
                original: data ? require(`../../../assests/images/product_images/${data["image"]}`).default : "",
                thumbnail: data ? require(`../../../assests/images/product_images/${data["image"]}`).default : "",
            }
        )) : [],
        showThumbnails: false,
        showPlayButton: false,
        autoPlay: true,
        showIndex: true
    };

    return (
        <>
            <ProductModalDiv
                centered
                visible={openProductModalBool}
                onCancel={() => handleCloseModal()}
                width={800}
                maskClosable={false}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                    >
                        <Link
                            onClick={
                                () => {
                                    //Setting User Token to storage
                                    const userToken = getToken();
                                    localStorage.setItem("user", userToken);
                                }
                            }
                            to={`/chat?user_id=${user_id}&product_id=${selectedProduct?.product_id}&seller_id=${selectedProduct?.seller_id}`}
                            target="_blank"
                        >
                            Talk
                        </Link>
                    </Button>
                ]}
            >
                <Row>
                    <Col
                        md={12}
                    >
                        <ImageGallery {...imageGalleryProps} style={{ padding: "10px" }} />
                    </Col>
                    <Col
                        md={{ span: 11, offset: 1 }}
                    >
                        <h1 id="product_name">{selectedProduct?.product_name}</h1>
                        <ul>
                            {selectedProduct?.product_details.map((detail, i) => (
                                <li key={i}>{detail?.product_detail}</li>
                            )
                            )}
                        </ul>
                        <h4>Product Available: {selectedProduct?.product_quantity}</h4>
                        <h4>Price: ${selectedProduct?.product_price}</h4>
                        <h4>Note: If you wish to buy the product, click the "Talk" button.</h4>
                    </Col>
                </Row>
            </ProductModalDiv>
        </>
    )

}

export default ProductModal;