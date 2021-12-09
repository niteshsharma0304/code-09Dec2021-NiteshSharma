import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarList from './Components/CarListing';
import CarDetail from './Components/CarDetails';

export default function AppRoutes() {
  let test = {a:21}
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/carlist' element={<CarList {...test}/>} />
          <Route exact path='/cardetail/:id' element={<CarDetail />} />
          <Route exact path='/' element={<CarList />} />
        </Routes>
      </BrowserRouter>
    );
  }