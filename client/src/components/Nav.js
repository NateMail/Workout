import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../components/auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

const Nav = ({ history }) => (
  <div>
    <ul className="nav nav-tabs" style={{ background: "#293B4D" }}>
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
              to={`/body/by/${isAuthenticated().user._id}`}
              style={isActive(
                history,
                `/body/by/${isAuthenticated().user._id}`
              )}
              className="nav-link"
            >
              My Body
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/lift/by/${isAuthenticated().user._id}`}
              style={isActive(
                history,
                `/lift/by/${isAuthenticated().user._id}`
              )}
              className="nav-link"
            >
              Lifts
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/cardio/by/${isAuthenticated().user._id}`}
              style={isActive(
                history,
                `/cardio/by/${isAuthenticated().user._id}`
              )}
              className="nav-link"
            >
              Cardio
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
