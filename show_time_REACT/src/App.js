import { useEffect } from "react";
import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNav from "./Component/AppNavbar";
import Login from "./VIEW/login";
import Concerts from "./VIEW/Concerts";
import Register from "./VIEW/register";
import Admin from "./VIEW/adminPage";
import ManageConcerts from "./VIEW/ManageConcerts";
import ManageUsers from "./VIEW/ManageUsers";
import Test from "./Component/testfile";
import UpdateConcert from "./VIEW/UpdateConcert";
import ManageGroups from "./VIEW/manageGroups";
import ManageLocations from "./VIEW/ManageLocations";
import BookedConcert from "./VIEW/BookedConcert";
import AddConcert from "./VIEW/addConcert";
import UpdateUsers from "./VIEW/UpdateUsers";
import ProfilePage from "./VIEW/ProfilePage";
import Chart from "./VIEW/chart";
import UserProfile from "./VIEW/profil";
import NathanQRCOde from "./VIEW/QR_Code_nathan";

function App() {

  return (

    <div className="App">

      <BrowserRouter>
        <AppNav></AppNav>

        <Routes>

          <Route path='/' element={<Concerts />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/manageUsers' element={<ManageUsers />}></Route>
          <Route path='/manageConcerts' element={<ManageConcerts />}></Route>
          <Route path='/UpdateConcert/:id' element={<UpdateConcert />}></Route>
          <Route path='/manageGroups' element={<ManageGroups />}></Route>
          <Route path='/manageLocations' element={<ManageLocations />}></Route>
          <Route path='/addConcert' element={<AddConcert />}></Route>
          <Route path='/UpdateUser/:id' element={<UpdateUsers />}></Route>
          <Route path='/ProfilePage/' element={<ProfilePage />}></Route>
          <Route path='/NathanQRCode/:id' element={<NathanQRCOde/>}></Route>
          <Route path='/testProfil' element={<UserProfile/>}></Route>
          <Route path='/testeur' element={<Test />}></Route>
          <Route path='/bookedConcert/:id' element={<BookedConcert/>}></Route>
          <Route path='/chartTest' element={<Chart/>}></Route>

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;

//const API_URL = '';

/*
const App = () => {

  const searchConcert = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log(data.Search);
  }

  useEffect(() => {
    searchConcert('');
  }, []);

  return (
    <div className="App">
      
    </div>
  );
}
*/
