import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();

    const { name, email, password } = this.state;

    const user = {
      name,
      email,
      password
    };
    signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
    });
  };

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div style={{ background: "#172B3E", height: "100vh" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>Sign Up</h2>
        <h3 style={{ textAlign: "center", color: "white" }}>
          Do not use real email or password this is not a secure server
        </h3>

        <div
          className="alert alert-primary"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New Account successfully created. Please{" "}
          <Link to="/signin">Sign In</Link>
        </div>

        <form
          style={{
            background: "#293B4D",
            color: "white",
            border: "5px black solid",
            padding: "5px"
          }}
        >
          <div className="form-group" style={{ textAlign: "center" }}>
            <label>Name</label>
            <input
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            />
          </div>
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

export default Signup;
