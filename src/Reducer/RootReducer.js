import { actionTypes } from "../app/CommonUtils/ActionTypes";
import initialState from "../app/CommonUtils/InitialState";

export default function RootReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SAVE_CAR_LIST:
            return { ...state, CarList: action.payload };
        default:
            return state;
    }
}