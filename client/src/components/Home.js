import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../components/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRunning,
  faDumbbell
} from "@fortawesome/free-solid-svg-icons";

const Home = ({ history }) => (
  <div style={{ background: "#172B3E", height: "100vh" }}>
    {!isAuthenticated() && (
      <>
        <h1>Workout App</h1>
      </>
    )}
    {isAuthenticated() && (
      <>
        <Link
          to={`/body/by/${isAuthenticated().user._id}`}
          className="nav-link"
        >
          <FontAwesomeIcon size="lg" icon={faUser} />
        </Link>
        <Link
          to={`/cardio/new/${isAuthenticated().user._id}`}
          className="nav-link"
        >
          <FontAwesomeIcon size="lg" icon={faRunning} />+
        </Link>
        <Link
          to={`/lift/new/${isAuthenticated().user._id}`}
          className="nav-link"
        >
          <FontAwesomeIcon size="lg" icon={faDumbbell} />+
        </Link>
      </>
    )}
  </div>
);

export default Home;
