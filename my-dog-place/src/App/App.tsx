
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '../routes';
import { HotelsMainPage } from '../Pages/Home/HotelsMainPage'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOTELS} element={<HotelsMainPage />} />
        {/* <Route path={ROUTES.HOTEL} element={<HotelPage/>}/> */}
      </Routes>
  </BrowserRouter>
  );
}

export default App;
