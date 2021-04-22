import { Row, Col, Image, Button, notification } from 'antd';
import { filter } from 'async';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OrderProductDiv } from './style.js';
import PaymentModal from './payment_modal';
import axios from 'axios';
import { API_URL, WEATHER_APP_API } from '../../../config';
import { timeConverter, AVERAGE_BIKE_SPEED, getLatLongDistance } from '../../../utils/harvesine_calculator';


const OrderProduct = ({ userId, productId, sellerId }) => {

    const [openModalBool, setOpenModalBool] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState();
    const [allProducts, setAllProducts] = useState();

    const current_user_id = useSelector(state => state?.user?.user?.user_id);
    const user_latitude = useSelector(state => state?.user?.user?.latitude ? parseFloat(state?.user?.user?.latitude) : "");
    const user_longitude = useSelector(state => state?.user?.user?.longitude ? parseFloat(state?.user?.user?.longitude) : "");


    useEffect(() => {
        axios.get(`${API_URL}/products/get-all-users-products`).
            then(res => {
                setAllProducts(res.data);
            }).catch(err => {
                console.log(err.response);
            })
    }, []);


    useEffect(() => {
        const filteredProduct = allProducts?.filter(item => item.product_id == productId);

        let time_for_delivery_in_hours;

        //Adding Time Distance
        for (let i = 0; i < filteredProduct?.length; i++) {

            let productLat = filteredProduct ? filteredProduct[i]["user_detail"]["address"]["latitude"] : null;
            let productLong = filteredProduct ? filteredProduct[i]["user_detail"]["address"]["longitude"] : null;
            const distance = getLatLongDistance(productLat, productLong, user_latitude, user_longitude);
            if (distance) {
                time_for_delivery_in_hours = timeConverter((distance / AVERAGE_BIKE_SPEED) * 60); //In Minutes
            } else {
                time_for_delivery_in_hours = "Cannot Estimate";
            }


            filteredProduct[i]["product_distance"] = distance;
            filteredProduct[i]["time_for_delivery_in_hours"] = time_for_delivery_in_hours;

        }

        setSelectedProduct(filteredProduct?.[0]);

    }, [productId, allProducts]);

    useEffect(() => {
        if (userId == current_user_id) {
            axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${selectedProduct?.user_detail?.address?.latitude}&lon=${selectedProduct?.user_detail?.address?.longitude}&appid=${WEATHER_APP_API}`)
                .then(res => {

                    let current_weather = res?.data?.weather[0]?.main;
                    let current_weather_icon = res?.data?.weather[0]?.icon
                    setCurrentWeather(current_weather);
                    setCurrentWeatherIcon(`http://openweathermap.org/img/w/${current_weather_icon}.png`);
                })
                .catch(err => {
                    console.log(err.response);
                })
        } else {
            axios.get(`${API_URL}/users/get-user-address?user_id=${userId}`)
                .then(res => {
                    axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${res?.data[0][0]["latitude"]}&lon=${res?.data[0][0]["longitude"]}&appid=${WEATHER_APP_API}`)
                        .then(res => {
                            console.log(res);
                            let current_weather = res?.data?.weather[0]?.main;
                            let current_weather_icon = res?.data?.weather[0]?.icon
                            setCurrentWeather(current_weather);
                            setCurrentWeatherIcon(`http://openweathermap.org/img/w/${current_weather_icon}.png`);

                        })
                        .catch(err => {
                            console.log(err.response);
                        })

                }).catch(err => {
                    console.log(err.response);
                })
        }
    }, [userId, current_user_id, selectedProduct]);


    const handleBuyClick = () => {
        setOpenModalBool(true);
    };


    return (
        <OrderProductDiv>
            <Row
                style={{
                    alignItems: "center"
                }}
            >
                <Col
                    md={{
                        span: 7,
                        offset: 2
                    }}
                >
                    {
                        selectedProduct ?
                            <Image
                                width={100}
                                alt={selectedProduct?.product_name}
                                src={require(`../../../assests/images/product_images/${selectedProduct?.product_images ? selectedProduct?.product_images[0]["image"] : ""}`).default || ""}
                            />
                            :
                            ""
                    }

                </Col>
                <Col
                    md={{ span: 10 }}
                >

                    {
                        current_user_id == userId ?
                            (
                                <>
                                    <h1 id="product_name">{selectedProduct?.product_name} ({selectedProduct?.product_quantity})</h1>
                                    <h4>Price: ${selectedProduct?.product_price}</h4>
                                    <h4>Seller Location Weather:{" "}
                                        {currentWeather ?
                                            <span>
                                                {currentWeatherIcon ?
                                                    <Image
                                                        width={30}
                                                        src={currentWeatherIcon}
                                                    >

                                                    </Image> :
                                                    ""
                                                }

                                                {currentWeather}
                                            </span>
                                            :
                                            <span>
                                                Weather Not Available
                                        </span>
                                        }
                                    </h4>
                                </>
                            ) :
                            (
                                <>
                                    <h1 id="product_name">{selectedProduct?.product_name} ({selectedProduct?.product_quantity})</h1>
                                    <h4>Price: ${selectedProduct?.product_price}</h4>
                                    <h4>Buyer Location Weather:{" "}
                                        {currentWeather ?
                                            <span>
                                                {currentWeatherIcon ?
                                                    <Image
                                                        width={30}
                                                        src={currentWeatherIcon}
                                                    >

                                                    </Image> :
                                                    ""
                                                }

                                                {currentWeather}
                                            </span>
                                            :
                                            <span>
                                                Weather Not Available
                                        </span>
                                        }
                                    </h4>
                                </>
                            )
                    }


                </Col>
                <Col
                    md={{
                        span: 3,
                        offset: 1
                    }}
                >
                    {
                        current_user_id == userId ?
                            (
                                <Button type="primary" onClick={() => { handleBuyClick() }}>Buy</Button>
                            )
                            :
                            (
                                <>
                                </>
                            )
                    }
                </Col>
            </Row>
            <PaymentModal product={selectedProduct} sellerId={sellerId} currentUserId={current_user_id} openModalBool={openModalBool} setOpenModalBool={setOpenModalBool} />
        </OrderProductDiv>
    )
}

export default OrderProduct;