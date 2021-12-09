import React, { useEffect } from "react";
import { getCarList } from "../app/CommonUtils/ApiSimulator";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../app/CommonUtils/ActionTypes";
import { useNavigate } from "react-router";
import { getCarListFromStore } from "./Utils";

export default function CarListData() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const carList = useSelector((store) => {
        return getCarListFromStore(store);
    });

    useEffect(() => {
        getCarList().then((carList) => {
            dispatch({ type: actionTypes.SAVE_CAR_LIST, payload: carList });
        })
    }, [dispatch]);

    if (!carList.length) {
        return (<div data-test="loading">Loading..................</div>)
    }

    const navigateToCarDetails = (id) => {
        navigate(`/cardetail/${id}`);
    }

    const renderCar = (car, index) => {
        return (
            <div className="car-list-container" data-test="car-list-container" key={index}>
                <span className="car-image">
                    <img src={car.Image} alt={car.Name + "-image"} />
                </span>
                <span className="car-info" data-test="car-info">
                    <p>{car.Name.toUpperCase()}</p>
                    <button id="btn-car-detail" data-test="btn-car-detail" onClick={() => navigateToCarDetails(car.Id)} >View Details</button>
                </span>
            </div>
        );
    }

    const renderCars = () => {
        return carList.map((car, index) => {
            return <div key={index}>{renderCar(car, index)}</div>
        });
    }

    return (
        <div>
            <h1 className="heading-text" data-test="heading-text">Here are the list of new cars from the Auto Expo 2021</h1>
            {renderCars()}
        </div>
    );
}