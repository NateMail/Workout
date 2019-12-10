import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../components/auth";

const Home = ({ history }) => (
  <div>
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
          {`${isAuthenticated().user.name}'s Body`}
        </Link>
        <Link
          to={`/cardio/new/${isAuthenticated().user._id}`}
          className="nav-link"
        >
          Add Cardio
        </Link>
        <Link
          to={`/lift/new/${isAuthenticated().user._id}`}
          className="nav-link"
        >
          Add Lift
        </Link>
      </>
    )}
  </div>
);

export default Home;
