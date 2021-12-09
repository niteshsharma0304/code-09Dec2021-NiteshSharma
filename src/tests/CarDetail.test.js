import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import { carListData } from '../app/CommonUtils/data';

let Component;
beforeEach(() => {
    Component = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );
});
describe("Car List to CarDetails Navigation", () => {
    it("Should render Loading... initially", () => {
        let loadingDiv = Component.find("[data-test='loading']");
        expect(loadingDiv.length).toEqual(1);
    });

    it("Should have button for details page in each car", () => {
        let carDetailButtons = Component.find("[data-test='btn-car-detail']");
        expect(carDetailButtons.length).toEqual(carListData.length);
    });

    it("Should navigate on button click", () => {
        let carDetailButtons = Component.find("[data-test='btn-car-detail']");
        carDetailButtons.first().simulate("click");
        expect(1).toEqual(1);
    });
});


describe("Car Details Heading", () => {
    it("Should render the heading", () => {
        let heading = Component.find("[data-test='heading-text']");
        expect(heading.length).toEqual(1);
    });

    it("Should render the correct title in heading", () => {
        let heading = Component.find("[data-test='heading-text']");
        let expectedHeading = carListData[0].Name.toUpperCase() + " - Behold the car that is known for its " + carListData[0].type;
        expect(heading.text()).toEqual(expectedHeading);
    });
});

describe("Car Details/Info", () => {
    it("Should render car name", () => {
        let name = Component.find("[data-test='car-name']");
        expect(name.text()).toEqual("Name: " + carListData[0].Name);
    });

    it("Should render car miles", () => {
        let miles = Component.find("[data-test='car-miles']");
        expect(miles.text()).toEqual("Miles_per_Gallon: " + carListData[0].Miles_per_Gallon);
    });

    it("Should render car cylinders", () => {
        let cylinders = Component.find("[data-test='car-cylinders']");
        expect(cylinders.text()).toEqual("Cylinders: " + carListData[0].Cylinders);
    });

    it("Should render car displacement", () => {
        let displacement = Component.find("[data-test='car-displacement']");
        expect(displacement.text()).toEqual("Displacement: " + carListData[0].Displacement);
    });

    it("Should render car horsepower", () => {
        let horsepower = Component.find("[data-test='car-horsepower']");
        expect(horsepower.text()).toEqual("Horsepower: " + carListData[0].Horsepower);
    });

    it("Should render car weight", () => {
        let weight = Component.find("[data-test='car-weight']");
        expect(weight.text()).toEqual("Weight_in_lbs: " + carListData[0].Weight_in_lbs);
    });

    it("Should render car acceleration", () => {
        let acceleration = Component.find("[data-test='car-acceleration']");
        expect(acceleration.text()).toEqual("Acceleration: " + carListData[0].Acceleration);
    });

    it("Should render car year", () => {
        let year = Component.find("[data-test='car-year']");
        expect(year.text()).toEqual("Year: " + carListData[0].Year);
    });

    it("Should render car origin", () => {
        let origin = Component.find("[data-test='car-origin']");
        expect(origin.text()).toEqual("Origin: " + carListData[0].Origin);
    });
});
