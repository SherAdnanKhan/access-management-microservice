import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import LogScreen from "./screens/LogScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<><Header /><HomeScreen /><Footer/></>} />
        <Route exact path='/login' element={<LoginScreen />} />
        <Route exact path='/logs' element={<><Header /><LogScreen /></>} />
        <Route exact path='/profile' element={<><Header /><Container><ProfileScreen /></Container><Footer/></>} />
      </Routes>
    </Router >
  )
};


export default App;
