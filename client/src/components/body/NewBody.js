import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiBody";
import { Redirect } from "react-router-dom";

class NewBody extends Component {
  constructor() {
    super();
    this.state = {
      height: 0,
      weight: 0,
      age: 0,
      bmr: 0,
      tdee: 0,
      sex: "",
      activity: 0,
      error: "",
      user: {},
      loading: false,
      redirectToHome: false
    };
  }

  componentDidMount() {
    this.userBodyData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { height, weight, age, sex, activity } = this.state;
    if (
      sex.length === 0 ||
      weight === 0 ||
      age === 0 ||
      height === 0 ||
      activity === 0
    ) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }

    if (weight < 0 || age < 0 || height < 0 || activity < 0) {
      this.setState({ error: "All fields must be positive", loading: false });
      return false;
    }

    return true;
  };

  handleChange = name => event => {
    console.log(this.state);
    this.setState({ error: "" });
    const value = event.target.value;
    this.userBodyData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.userBodyData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            height: 0,
            weight: 0,
            age: 0,
            bmr: 0,
            tdee: 0,
            sex: "",
            activity: 0,
            error: "",
            loading: false,
            redirectToProfile: true
          });
        }
      });
    }
  };

  newBodyForm = (height, weight, age) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Height in inches</label>
        <input
          onChange={this.handleChange("height")}
          type="number"
          className="form-control"
          value={height}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Weight in pounds</label>
        <input
          onChange={this.handleChange("weight")}
          type="number"
          className="form-control"
          value={weight}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Age</label>
        <input
          onChange={this.handleChange("age")}
          type="number"
          className="form-control"
          value={age}
        />
      </div>
      <h6 className="text-muted">Sex</h6>
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className="form-check">
          <label className="text-muted">Female</label>
          <input
            onChange={this.handleChange("sex")}
            type="radio"
            checked={this.state.sex === "Female"}
            className="form-control"
            value="Female"
          />
        </div>
        <div className="form-check">
          <label className="text-muted">Male</label>
          <input
            onChange={this.handleChange("sex")}
            type="radio"
            checked={this.state.sex === "Male"}
            className="form-control"
            value="Male"
          />
        </div>
      </div>

      <h6 className="text-muted">Activity Level</h6>
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className="form-check">
          <label className="text-muted">Sedentary</label>
          <input
            onChange={this.handleChange("activity")}
            type="radio"
            checked={this.state.activity === 1.2}
            className="form-control"
            value="1.2"
          />
        </div>
        <div className="form-check">
          <label className="text-muted">Lightly Active</label>
          <input
            onChange={this.handleChange("activity")}
            type="radio"
            checked={this.state.activity === 1.375}
            className="form-control"
            value="1.375"
          />
        </div>
        <div className="form-check">
          <label className="text-muted">Moderately Active</label>
          <input
            onChange={this.handleChange("activity")}
            type="radio"
            checked={this.state.activity === 1.55}
            className="form-control"
            value="1.55"
          />
        </div>
        <div className="form-check">
          <label className="text-muted">Very Active</label>
          <input
            onChange={this.handleChange("activity")}
            type="radio"
            checked={this.state.activity === 1.725}
            className="form-control"
            value="1.725"
          />
        </div>
        <div className="form-check">
          <label className="text-muted">Extremely Active</label>
          <input
            onChange={this.handleChange("activity")}
            type="radio"
            checked={this.state.activity === 1.9}
            className="form-control"
            value="1.9"
          />
        </div>
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Create Your Body Type
      </button>
    </form>
  );

  render() {
    const {
      height,
      weight,
      age,
      sex,
      user,
      error,
      loading,
      redirectToProfile
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create Body Type</h2>
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
        {this.newBodyForm(height, weight, age, sex)}
      </div>
    );
  }
}

export default NewBody;
