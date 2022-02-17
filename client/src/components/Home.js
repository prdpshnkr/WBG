import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Home.css";
import bgphoto from "../assets/birding.jpg";

function Home() {
  return (
    <div className="container">
      <div className="content">
        <h1>eBirder</h1>
        <h3>Welcome to eBirder</h3>
        <p>Create and maintain your birding checklists here</p>
        <a>
          <button>
            <Link className="text-light" aria-current="page" to="/record">
              Record
            </Link>
          </button>
        </a>
      </div>
      <div className="image">
        <img src={bgphoto} alt="birding"></img>
      </div>
    </div>
  );
}

export default Home;
