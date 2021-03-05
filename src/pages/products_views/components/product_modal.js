import { Row, Col, Modal, Button } from "antd";
import { select } from "async";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { ProductModalDiv } from './style';


const ProductModal = ({
    openProductModalBool,
    setOpenProductModalBool,
    selectedProduct,
    setSelectedProduct
}) => {
    const handleCloseModal = () => {
        setOpenProductModalBool(false);
        setSelectedProduct(null);
    }

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
                        Talk
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
                                console.log(i),
                                <li key={i}>{detail?.product_detail}</li>
                            )
                            )}
                        </ul>
                        <h4>Product Available: {selectedProduct?.product_quantity}</h4>
                        <h4>$ {selectedProduct?.product_price}</h4>
                        <h4>Note: If you wish to buy the product, click the "Talk" button.</h4>
                    </Col>
                </Row>

            </ProductModalDiv>
        </>
    )

}

export default ProductModal;