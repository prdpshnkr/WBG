import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ObsRecordForm from "./components/ObsRecordForm";
import Header from "./components/Header";
import Home from "./components/Home";
import MyObservations from "./components/MyObservations";
import Hotspots from "./components/Hotspots";


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/record">
          <ObsRecordForm />
        </Route>
        <Route exact path="/observations">
          <MyObservations />
        </Route>
        <Route exact path="/hotspots">
          <Hotspots />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
