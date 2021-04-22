import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Modal, Button, Input, notification } from "antd";
import { select } from "async";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";
import { ProductModalDiv } from './style';
import { getToken } from '../../../utils/storage';
import axios from 'axios';
import { API_URL } from '../../../config';


const ProductModal = ({
    openProductModalBool,
    setOpenProductModalBool,
    selectedProduct,
    setSelectedProduct
}) => {

    const user_id = useSelector(state => state?.user?.user?.user_id);
    const [review, setReview] = useState("");

    const handleCloseModal = () => {
        setOpenProductModalBool(false);
        setSelectedProduct(null);
    }

    const handleAddReview = () => {
        const values = {
            user_id,
            product_id: selectedProduct?.product_id,
            review: review
        }
        if (review != "") {
            axios.post(`${API_URL}/users/add-product-review`, values)
                .then(res => {
                    notification.success({
                        message: res.data,
                        duration: 3
                    })
                    setReview("");
                }).catch(err => {
                    console.log(err.response);
                    notification.error({
                        message: err.response.data.message,
                        duration: 3
                    })
                });
        } else {
            notification.error({
                message: "Empty Review Found!",
                duration: 3
            })
        }
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
        showIndex: true,
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
                        <div className="description-divs">
                            <ul>
                                {selectedProduct?.product_details.map((detail, i) => (
                                    <li key={i}>{detail?.product_detail}</li>
                                )
                                )}
                            </ul>
                        </div>
                        <h4>Product Available: {selectedProduct?.product_quantity}</h4>
                        <h4>Estimated Delivery Time: {selectedProduct?.time_for_delivery_in_hours}</h4>
                        <h4>Price: ${selectedProduct?.product_price}</h4>
                        <h4>Note: If you wish to buy the product, click the "Talk" button.</h4>
                        <h4>Reviews:</h4>
                        <div className="description-divs">
                            <ul className="review-ul">
                                {selectedProduct?.product_reviews?.length > 0 ?
                                    selectedProduct?.product_reviews.map((review, i) => (
                                        <li key={i}>{review?.reviews}</li>
                                    ))
                                    :
                                    "No Reviews"
                                }
                            </ul>
                        </div>
                        <Input value={review} onChange={(e) => { setReview(e.target.value) }} style={{ marginBottom: "5px" }} placeholder="Type your review..." />
                        <Button type="primary" onClick={handleAddReview}>Add Review</Button>
                    </Col>
                </Row>
            </ProductModalDiv>
        </>
    )

}

export default ProductModal;