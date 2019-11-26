import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiLift";
import { Redirect } from "react-router-dom";

class NewLift extends Component {
  constructor() {
    super();
    this.state = {
      workoutName: "",
      weight: 0,
      reps: 0,
      sets: 0,
      error: "",
      user: {},
      loading: false,
      redirectToHome: false
    };
  }

  componentDidMount() {
    this.userLiftData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { workoutName, weight, reps, sets } = this.state;
    if (workoutName.length === 0 || weight === 0 || reps === 0 || sets === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }

    if (weight < 0 || reps < 0 || sets < 0) {
      this.setState({ error: "All fields must be positive", loading: false });
      return false;
    }

    return true;
  };

  handleChange = name => event => {
    console.log(this.state);
    this.setState({ error: "" });
    const value = event.target.value;
    this.userLiftData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.userLiftData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            workoutName: "",
            weight: 0,
            reps: 0,
            sets: 0,
            error: "",
            loading: false,
            redirectToProfile: true
          });
        }
      });
    }
  };

  newLiftForm = (workoutName, weight, reps, sets) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Workout Name</label>
        <input
          onChange={this.handleChange("workoutName")}
          type="text"
          className="form-control"
          value={workoutName}
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
        <label className="text-muted">How many reps?</label>
        <input
          onChange={this.handleChange("reps")}
          type="number"
          className="form-control"
          value={reps}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">How many sets?</label>
        <input
          onChange={this.handleChange("sets")}
          type="number"
          className="form-control"
          value={sets}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Create Your Lift
      </button>
    </form>
  );

  render() {
    const {
      workoutName,
      weight,
      reps,
      sets,
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
        <h2 className="mt-5 mb-5">Create Lift</h2>
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
        {this.newLiftForm(workoutName, weight, reps, sets)}
      </div>
    );
  }
}

export default NewLift;
