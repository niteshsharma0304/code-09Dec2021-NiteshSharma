export function getCarListFromStore(store){
    return ((store.RootReducer && store.RootReducer.CarList) || []);
}