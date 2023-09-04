
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './routes';
import { HotelsMainPage } from './Pages/Home/HotelsMainPage'
import Login from './Pages/Login/Login'
import List from './Pages/List/List';
import Hotel from './Pages/Hotel/Hotel';
import Register from './Pages/Register/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<HotelsMainPage />} />
        <Route path={ROUTES.HOTELS} element={<List/>}/>
        <Route path={ROUTES.HOTEL} element={<Hotel/>}/>
        <Route path={ROUTES.REGISTER} element={<Register/>}/>

      </Routes>
  </BrowserRouter>
  );
}

export default App;
