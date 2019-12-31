import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
// import SocialLogin from "./SocialLogin";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToRefer: false,
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;

    const user = {
      email,
      password
    };
    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToRefer: true });
        });
      }
    });
  };

  render() {
    const { email, password, error, redirectToRefer, loading } = this.state;
    if (redirectToRefer) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ background: "#172B3E", height: "100vh" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>Sign In</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        <form
          style={{
            background: "#293B4D",
            color: "white",
            border: "5px black solid",
            padding: "5px"
          }}
        >
          <div className="form-group" style={{ textAlign: "center" }}>
            <label>Email</label>
            <input
              onChange={this.handleChange("email")}
              type="text"
              className="form-control"
              value={email}
            />
          </div>
          <div className="form-group" style={{ textAlign: "center" }}>
            <label>Password</label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              value={password}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
            style={{ margin: "0px 47%" }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signin;
