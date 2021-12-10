import React, { useState, useEffect } from "react";
import { getCarList } from "../CommonUtils/ApiSimulator";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../CommonUtils/ActionTypes";
import { useNavigate } from "react-router";
import { maxCarsOnPage } from "./Constants";

export default function CarListData() {
    const [pageIndex, setPageIndex] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const carList = useSelector(store => store.CarList);

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
        let lastCar = maxCarsOnPage * pageIndex;
        let firstCar = lastCar - 5;
        let paginatedCarList = carList.slice(firstCar, lastCar);
        return paginatedCarList.map((car, index) => {
            return <div key={index}>{renderCar(car, index)}</div>
        });
    }

    const renderPreviousButton = () => {
        let btnClass = "btn", disabled = false;
        if(pageIndex === 1){
            btnClass = btnClass +  " disabled";
            disabled = true;
        }
        const onPrevious = () => {
            if (pageIndex > 1)
                setPageIndex(pageIndex - 1);
        }
        return <button id="previous-page"  data-test="previous-page" disabled={disabled}  onClick={onPrevious} className={btnClass}>Previous</button>;
    }

    const renderNextButton = () => {
        let itemsShown = maxCarsOnPage * pageIndex;
        let isEnableNext = (carList.length > itemsShown);
        let btnClass = "btn", disabled=false;
        if (!isEnableNext){
            btnClass = btnClass + " disabled";
            disabled = true;
        }
        const onNext = () => {
            if (isEnableNext)
                setPageIndex(pageIndex + 1);
        }
        return <button id="next-page" data-test="next-page" disabled={disabled} onClick={onNext} className={btnClass}>Next</button>;
    }

    return (
        <div>
            <h1 className="heading-text" data-test="heading-text">Here are the list of new cars from the Auto Expo 2021</h1>
            <div className="mid-wrapper">
            {renderCars()}
                </div>  
           <div className="pagination">
               {renderPreviousButton()}
              <span data-test="current-page">Page: {pageIndex} of {Math.ceil(carList.length/maxCarsOnPage)}</span>
              {renderNextButton()}
            </div> 
        </div>
    );
}