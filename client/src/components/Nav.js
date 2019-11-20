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
              to={`/user/${isAuthenticated().user._id}`}
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              className="nav-link"
            >
              {`${isAuthenticated().user.name}'s profile`}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/body/by/${isAuthenticated().user._id}`}
              style={isActive(
                history,
                `/body/by/${isAuthenticated().user._id}`
              )}
              className="nav-link"
            >
              {`${isAuthenticated().user.name}'s body`}
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
