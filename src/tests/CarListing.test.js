import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import {carListData} from '../app/CommonUtils/data';

describe("CarListing Basic Rendering", () => {
    let CarDetailsComp;
    beforeEach(() => {
        CarDetailsComp = mount(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    it("Should render Loading... initially", () => {
        let loadingDiv = CarDetailsComp.find("[data-test='loading']");
        expect(loadingDiv.length).toEqual(1);
    });

    describe("Rendering after Store Update", () => {
        it("Should render CarList after store update", () => {
            let carListContainer = CarDetailsComp.find("[data-test='car-list-container']");
            expect(carListContainer.length).toEqual(carListData.length);
        });
        it ("Should render the heading", () => {
            let heading = CarDetailsComp.find("[data-test='heading-text']");
            expect(heading.length).toEqual(1);
            expect(heading.text()).toEqual("Here are the list of new cars from the Auto Expo 2021");
        });
        it("Should render the CarInfo", ()=>{
            let firstCarInfo = CarDetailsComp.find("[data-test='car-info']").first();
            let namePara = firstCarInfo.find("p");
            expect(namePara.text()).toEqual(carListData[0].Name.toUpperCase());
        });
    });

});
