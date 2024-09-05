import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Alert from "./component/layout/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
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
          </Routes>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
