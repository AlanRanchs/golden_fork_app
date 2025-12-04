import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/home";
import { Cart } from "./pages/Cart/Cart";
import { PlaceOrder } from "./pages/PlaceOrder/PlaceOrder";
import { Verify } from "./pages/Verify/Verify";
import { MyOrders } from "./pages/MyOrders/MyOrders";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { LoginPopup } from "./components/LoginPopup/LoginPopup";
import useTourGuide from "./components/TourGuide/TourGuide";

const App = () => {
  
  const [showLogin, setShowLogin] = useState(false);
  
  // Inicializar el tour guiado
  const { startTour } = useTourGuide();

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} onStartTour={startTour} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;
