import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import persistStore from '../app/store';
import App from '../App';
import { carListData } from '../CommonUtils/data';
import { maxCarsOnPage } from '../Components/Constants';
import { PersistGate } from 'redux-persist/integration/react'

let CarDetailsComp;
let { store, persistor } = persistStore();
beforeEach(() => {
    CarDetailsComp = mount(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
});

describe("CarListing Basic Rendering", () => {
    it("Should render Loading... initially", () => {
        let loadingDiv = CarDetailsComp.find("[data-test='loading']");
        expect(loadingDiv.length).toEqual(1);
    });

    describe("Rendering after Store Update", () => {
        it("Should render CarList after store update", () => {
            let carListContainer = CarDetailsComp.find("[data-test='car-list-container']");
            expect(carListContainer.length).toEqual(maxCarsOnPage);
        });
        it("Should render the heading", () => {
            let heading = CarDetailsComp.find("[data-test='heading-text']");
            expect(heading.length).toEqual(1);
            expect(heading.text()).toEqual("Here are the list of new cars from the Auto Expo 2021");
        });
        it("Should render the CarInfo", () => {
            let firstCarInfo = CarDetailsComp.find("[data-test='car-info']").first();
            let namePara = firstCarInfo.find("p");
            expect(namePara.text()).toEqual(carListData[0].Name.toUpperCase());
        });
    });
});

describe("Pagination", () => {
    let previousBtn, nextBtn;
    beforeEach(() => {
        previousBtn = CarDetailsComp.find("[data-test='previous-page']");
        nextBtn = CarDetailsComp.find("[data-test='next-page']");
    });
    it("Should render Previous & Next buttons", () => {
        expect(previousBtn.length).toEqual(1);
        expect(nextBtn.length).toEqual(1);
    });
    it("Should render Previous button as disabled", () => {
        expect(previousBtn.hasClass("disabled")).toBeTruthy();
    });
    it("Should render Next button as enabled", () => {
        expect(nextBtn.hasClass("disabled")).toEqual(false);
    });
    it("Should render current page", () => {
        let currentPage = CarDetailsComp.find("[data-test='current-page']");
        expect(currentPage.text()).toEqual("Page: 1 of " + Math.ceil(carListData.length / maxCarsOnPage));
    });

    describe("Page 2 view", () => {
        beforeEach(() => {
            previousBtn = CarDetailsComp.find("[data-test='previous-page']");
            nextBtn = CarDetailsComp.find("[data-test='next-page']");
            nextBtn.simulate("click");
        });
        it("Should switch to Page 2 on Next", () => {
            let currentPage = CarDetailsComp.find("[data-test='current-page']");
            expect(currentPage.text()).toEqual("Page: 2 of " + Math.ceil(carListData.length / maxCarsOnPage));
        });
        it("Should render the 6th car on top", () => {
            let firstCarInfo = CarDetailsComp.find("[data-test='car-info']").first();
            let namePara = firstCarInfo.find("p");
            expect(namePara.text()).toEqual(carListData[5].Name.toUpperCase());
        });
    });

    describe("Back to Page 1 view", () => {
        it("Should switch to Page 1 on Previous", () => {
            previousBtn.simulate("click");
            let currentPage = CarDetailsComp.find("[data-test='current-page']");
            expect(currentPage.text()).toEqual("Page: 1 of " + Math.ceil(carListData.length / maxCarsOnPage));
        });
        it("Should render the 1st car on top", () => {
            let firstCarInfo = CarDetailsComp.find("[data-test='car-info']").first();
            let namePara = firstCarInfo.find("p");
            expect(namePara.text()).toEqual(carListData[0].Name.toUpperCase());
        });
        it("Should disable only Previous button", () => {
            expect(previousBtn.hasClass("disabled")).toEqual(true);
            expect(nextBtn.hasClass("disabled")).toEqual(false);
        });
    });
});