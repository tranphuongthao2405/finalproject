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
import FungusAndParasite from "./components/staff/medicalTests/FungusAndParasite";
import Biochemical from "./components/staff/medicalTests/Biochemical";
import HematologyAndImmunology from "./components/staff/medicalTests/HematologyAndImmunology";
import Result from "./components/staff/medicalTests/Result";

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
            <Route path="/fungusAndParasite" component={FungusAndParasite} />
            <Route path="/biochemical" component={Biochemical} />
            <Route path="/hematologyAndImmunology" component={HematologyAndImmunology} />
            <Route path="/result" component={Result} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
