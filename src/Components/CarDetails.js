import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCarListFromStore } from "./Utils";

export default function CarDetails() {
    const { id } = useParams()
    const carList = useSelector((store) => {
        return getCarListFromStore(store);
    });

    const carInfo = carList.find(item => item.Id.toString() === id)

    if (!carInfo) return (<div>Car Not Found</div>);

    const renderCarInfo = (label, value) =>{
        return <><strong>{label}: </strong>{value}</>;
    }

    return (
        <>
            <h1 className="heading-text" data-test="heading-text">{carInfo.Name.toUpperCase()} - Behold the car that is known for its {carInfo.type}</h1>
            <div className="car-detail">
                <img src={carInfo.Image} alt={carInfo.Name + "-image"} />
                <div className="data-detail">
                <div data-test={"car-name"}>{renderCarInfo("Name", carInfo.Name)}</div>
                <div data-test={"car-miles"}>{renderCarInfo("Miles_per_Gallon", carInfo.Miles_per_Gallon)}</div>
                <div data-test={"car-cylinders"}>{renderCarInfo("Cylinders", carInfo.Cylinders)}</div>
                <div data-test={"car-displacement"}>{renderCarInfo("Displacement", carInfo.Displacement)}</div>
                <div data-test={"car-horsepower"}>{renderCarInfo("Horsepower", carInfo.Horsepower)}</div>
                <div data-test={"car-weight"}>{renderCarInfo("Weight_in_lbs", carInfo.Weight_in_lbs)}</div>
                <div data-test={"car-acceleration"}>{renderCarInfo("Acceleration", carInfo.Acceleration)}</div>
                <div data-test={"car-year"}>{renderCarInfo("Year", carInfo.Year)}</div>
                <div data-test={"car-origin"}>{renderCarInfo("Origin", carInfo.Origin)}</div>
                </div>
            </div>
        </>
    );
}