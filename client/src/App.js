import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ObsRecordForm from "./components/ObsRecordForm";
import Header from "./components/Header";
import Home from "./components/Home";
import MyObservations from "./components/MyObservations";
import Hotspots from "./components/Hotspots";
import { SearchContext } from "./context/SearchContext";
import BirdContext  from "./context/BirdContext";

function App() {
  const [add, setAdd] = useState("");
  const [coords, setCoords] = useState({});

  const [bird, setBird] = useState("");

  console.log(bird);
  console.log(coords);

  return (
    <div className="App">
      <SearchContext.Provider value={{ add, setAdd, coords, setCoords }}>
        <BirdContext.Provider value={{bird, setBird}}>
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
        </BirdContext.Provider>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
