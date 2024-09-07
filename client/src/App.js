import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Alert from "./component/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import Profile from "./component/profile/Profile";
import EditProfile from "./component/profile/EditProfile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import About from "./component/about/About";
import AddProduct from "./component/product/AddProduct";
import Prouduct from "./component/product/Prouduct";
import Shop from "./component/shop/Shop";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

if(localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => { 
  useEffect(()=>{
    store.dispatch(loadUser())
  },[]);
  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path='/' Component={Landing} />
          
        </Routes>
        <section className='container'>
        <Alert />
          <Routes>
            <Route exact path='/register' Component={Register} />
            <Route exact path='/login' Component={Login} />
            <Route exact path='/profile' Component={Profile} />
            <Route exact path='/about' Component={About} />
            <Route exact path='/product/:id' Component={Prouduct} />
            <Route exact path='/shop' Component={Shop} />
            <Route exact path='/add-product' element={<PrivateRoute><AddProduct /></PrivateRoute>} />
            <Route exact path='/edit-profile' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
}
export default App;
