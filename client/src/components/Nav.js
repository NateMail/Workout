import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../components/auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

const Nav = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>

      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              to={`/lift/new/${isAuthenticated().user._id}`}
              style={isActive(
                history,
                `/lift/new/${isAuthenticated().user._id}`
              )}
              className="nav-link"
            >
              Add Lift
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/cardio/new/${isAuthenticated().user._id}`}
              style={isActive(
                history,
                `/cardio/new/${isAuthenticated().user._id}`
              )}
              className="nav-link"
            >
              Add Cardio
            </Link>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={
                (isActive(history, "/signout"),
                { cursor: "pointer", color: "white" })
              }
              onClick={() => signout(() => history.push("/"))}
            >
              Sign Out
            </span>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Nav);
