import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiCardio";
import { Redirect } from "react-router-dom";

class NewCardio extends Component {
  constructor() {
    super();
    this.state = {
      workoutName: "",
      time: 0,
      distance: 0,
      pace: 0,
      error: "",
      user: {},
      loading: false,
      redirectToHome: false
    };
  }

  componentDidMount() {
    this.userCardioData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { workoutName, time, distance } = this.state;
    if (workoutName.length === 0 || time === 0 || distance === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }

    if (distance < 0 || time < 0) {
      this.setState({ error: "All fields must be positive", loading: false });
      return false;
    }

    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.userCardioData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.userCardioData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            workoutName: "",
            time: 0,
            distance: 0,
            error: "",
            loading: false,
            redirectToProfile: true
          });
        }
      });
    }
  };

  newCardioForm = (workoutName, time, distance) => (
    <form
      style={{
        background: "#293B4D",
        color: "white",
        border: "5px black solid",
        padding: "5px"
      }}
    >
      <div className="form-group" style={{ textAlign: "center" }}>
        <label>Workout Name</label>
        <input
          onChange={this.handleChange("workoutName")}
          placeholder="Workout"
          type="text"
          className="form-control"
          value={workoutName}
          style={{ textAlign: "center" }}
        />
      </div>
      <div className="form-group" style={{ textAlign: "center" }}>
        <label>Time in minutes</label>
        <input
          onChange={this.handleChange("time")}
          type="number"
          className="form-control"
          value={time}
          style={{ textAlign: "center" }}
        />
      </div>
      <div className="form-group" style={{ textAlign: "center" }}>
        <label>Distance in miles</label>
        <input
          onChange={this.handleChange("distance")}
          type="number"
          className="form-control"
          value={distance}
          style={{ textAlign: "center" }}
        />
      </div>

      <button
        onClick={this.clickSubmit}
        className="btn btn-raised btn-primary"
        style={{ margin: "0px 45%" }}
      >
        Create Your Cardio Workout
      </button>
    </form>
  );

  render() {
    const {
      workoutName,
      time,
      distance,
      user,
      error,
      loading,
      redirectToProfile
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/cardio/by/${user._id}`} />;
    }

    return (
      <div style={{ background: "#172B3E", height: "100vh" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>
          Create Cardio Workout
        </h2>
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
        {this.newCardioForm(workoutName, time, distance)}
      </div>
    );
  }
}

export default NewCardio;
