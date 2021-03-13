import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Rate, Progress } from 'antd';
import { getAllCustomerDetails } from '../../../redux';
import { RatingDiv } from './style';
import './style.css';

const AdminRatingsPage = () => {
    const dispatch = useDispatch();
    const [totalRating, setTotalRating] = useState(0);
    const [totalRaters, setTotalRaters] = useState(0);
    const [ratingsObject, setRatingsObject] = useState({
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
    });

    const allCustomerDetails = useSelector(state => state.adminCustomerDetails?.customerDetails);

    useEffect(() => {
        dispatch(getAllCustomerDetails());
    }, []);
    console.log(allCustomerDetails);


    useEffect(() => {
        let totalRaters = 0;
        let totalRates = 0;

        allCustomerDetails?.forEach(user => {
            if (user?.application_rating) {
                totalRates += parseInt(user?.application_rating);

                if (user?.application_rating in ratingsObject) {
                    setRatingsObject((prevState) => ({
                        ...prevState,
                        [user?.application_rating]: ratingsObject[user?.application_rating] + 1
                    }));

                }
                totalRaters++;
            }
        });
        setTotalRaters(totalRaters);
        setTotalRating(totalRates / totalRaters);

    }, [allCustomerDetails]);


    return (
        <>
            <div className="div-header">
                <h1>Application Ratings</h1>
            </div>
            <RatingDiv>

                <Row
                    gutter={24}
                >
                    <Col
                        md={{ span: 8, offset: 3 }}
                        xs={24}
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <p id="total-rating">{totalRating}</p>
                        <Rate value={totalRating} disabled />
                        <p id="total-raters">Total Raters: {totalRaters}</p>
                    </Col>
                    <Col
                        md={12}
                        xs={24}
                    >
                        <Row>
                            <Col

                                md={{ span: 4, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <p className="stars-label">5 Stars:</p>
                            </Col>
                            <Col
                                md={{ span: 8, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <span className="rating-bar"><Progress percent={(ratingsObject["5"] / totalRaters) * 100} showInfo={false} /></span>
                            </Col>
                        </Row>
                        <Row>
                            <Col

                                md={{ span: 4, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <p className="stars-label">4 Stars:</p>
                            </Col>
                            <Col
                                md={{ span: 8, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <span className="rating-bar">
                                    <Progress percent={(ratingsObject["4"] / totalRaters) * 100} showInfo={false} />
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col

                                md={{ span: 4, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <p className="stars-label">3 Stars:</p>
                            </Col>
                            <Col
                                md={{ span: 8, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <span className="rating-bar"><Progress percent={(ratingsObject["3"] / totalRaters) * 100} showInfo={false} /></span>
                            </Col>
                        </Row>
                        <Row>
                            <Col

                                md={{ span: 4, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <p className="stars-label">2 Stars:</p>
                            </Col>
                            <Col
                                md={{ span: 8, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <span className="rating-bar"><Progress percent={(ratingsObject["2"] / totalRaters) * 100} showInfo={false} /></span>
                            </Col>
                        </Row>
                        <Row>
                            <Col

                                md={{ span: 4, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <p className="stars-label">1 Stars:</p>
                            </Col>
                            <Col
                                md={{ span: 8, offset: 2 }}
                                xs={{ span: 24 }}
                            >
                                <span className="rating-bar"><Progress percent={(ratingsObject["1"] / totalRaters) * 100} showInfo={false} /></span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </RatingDiv>
        </>
    )
}

export default AdminRatingsPage;