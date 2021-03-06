import React, { Component } from "react";
import { singleCardio, update } from "./apiCardio";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";

class EditCardio extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      workoutName: "",
      time: 0,
      distance: 0,
      pace: 0,
      redirectToHome: false,
      error: "",
      loading: false
    };
  }

  init = cardioId => {
    const token = isAuthenticated().token;
    singleCardio(cardioId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToHome: true });
      } else {
        this.setState({
          id: data.addedBy,
          workoutName: data.workoutName,
          time: data.time,
          distance: data.distance,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.cardioData = new FormData();
    const cardioId = this.props.match.params.cardioId;
    this.init(cardioId);
  }

  isValid = () => {
    const { workoutName, time, distance } = this.state;
    if (workoutName.length === 0 || time <= 0 || distance <= 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.cardioData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const cardioId = this.props.match.params.cardioId;
      const token = isAuthenticated().token;

      update(cardioId, token, this.cardioData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            workoutName: "",
            time: 0,
            distance: 0,
            redirectToProfile: true
          });
        }
      });
    }
  };

  editCardioForm = (workoutName, time, distance) => (
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
          type="text"
          className="form-control"
          value={workoutName}
          style={{ textAlign: "center" }}
        />
      </div>

      <div className="form-group" style={{ textAlign: "center" }}>
        <label>Time</label>
        <input
          onChange={this.handleChange("time")}
          type="number"
          className="form-control"
          value={time}
          style={{ textAlign: "center" }}
        />
      </div>

      <div className="form-group" style={{ textAlign: "center" }}>
        <label>Distance</label>
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
        className="btn btn-raised btn-md btn-primary"
        style={{ margin: "0px 45%" }}
      >
        Update Workout
      </button>
    </form>
  );

  render() {
    const {
      id,
      workoutName,
      time,
      distance,
      redirectToProfile,
      error,
      loading
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/cardio/by/${isAuthenticated().user._id}`} />;
    }

    return (
      <div style={{ background: "#172B3E", height: "100vh" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", color: "white" }}>{workoutName}</h2>

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

          {isAuthenticated().user._id === id &&
            this.editCardioForm(workoutName, time, distance)}

          <Link
            className="btn btn-raised btn-md btn-success"
            style={{ margin: "5px" }}
            to={`/cardio/by/${id}`}
          >
            Back to Cardios
          </Link>
        </div>
      </div>
    );
  }
}

export default EditCardio;
