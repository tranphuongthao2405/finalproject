import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AdminBoard from "./components/AdminBoard";
import DoctorBoard from "./components/doctor/DoctorBoard";
import LaboratoryStaff from "./components/staff/LaboratoryStaff";
import Navbar from "./components/Navbar";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import LaboratoryTest from "./components/staff/LaboratoryTest";
import TestHeader from "./components/staff/medicalTests/TestHeader";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <div>
        <Navbar />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/doctor" component={DoctorBoard} />
            <Route path="/admin" component={AdminBoard} />

            <Route path="/laboratoryStaff" component={LaboratoryStaff} />
            <Route path="/laboratoryTests" component={LaboratoryTest}/>
            <Route path="/testHeader" component={TestHeader} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
