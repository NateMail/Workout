import React, { Component } from "react";
import { singleLift, update } from "./apiLift";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";

class EditLift extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      workoutName: "",
      weight: 0,
      reps: 0,
      sets: 0,
      redirectToHome: false,
      error: "",
      loading: false
    };
  }

  init = liftId => {
    const token = isAuthenticated().token;
    singleLift(liftId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToHome: true });
      } else {
        this.setState({
          id: data.addedBy,
          workoutName: data.workoutName,
          weight: data.weight,
          reps: data.reps,
          sets: data.sets,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.liftData = new FormData();
    const liftId = this.props.match.params.liftId;
    this.init(liftId);
  }

  isValid = () => {
    const { workoutName, weight, reps, sets } = this.state;
    if (workoutName.length === 0 || weight <= 0 || reps <= 0 || sets <= 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.liftData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const liftId = this.props.match.params.liftId;
      const token = isAuthenticated().token;

      update(liftId, token, this.liftData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            workoutName: "",
            weight: 0,
            reps: 0,
            sets: 0,
            redirectToProfile: true
          });
        }
      });
    }
  };

  editCardioForm = (workoutName, weight, reps, sets) => (
    <form
      style={{
        background: "#293B4D",
        color: "white",
        border: "5px black solid",
        padding: "5px",
        textAlign: "center"
      }}
    >
      <div className="form-group">
        <label>Workout Name</label>
        <input
          onChange={this.handleChange("workoutName")}
          style={{ textAlign: "center" }}
          type="text"
          className="form-control"
          value={workoutName}
        />
      </div>

      <div className="form-group">
        <label>Weight</label>
        <input
          onChange={this.handleChange("weight")}
          style={{ textAlign: "center" }}
          type="number"
          className="form-control"
          value={weight}
        />
      </div>

      <div className="form-group">
        <label>Reps</label>
        <input
          onChange={this.handleChange("reps")}
          style={{ textAlign: "center" }}
          type="number"
          className="form-control"
          value={reps}
        />
      </div>
      <div className="form-group">
        <label>Sets</label>
        <input
          onChange={this.handleChange("sets")}
          style={{ textAlign: "center" }}
          type="number"
          className="form-control"
          value={sets}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Update Workout
      </button>
    </form>
  );

  render() {
    const {
      id,
      workoutName,
      weight,
      reps,
      sets,
      redirectToProfile,
      error,
      loading
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/lift/by/${isAuthenticated().user._id}`} />;
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
            this.editCardioForm(workoutName, weight, reps, sets)}

          <Link
            className="btn btn-raised btn-md btn-success"
            style={{ margin: "5px" }}
            to={`/lift/by/${id}`}
          >
            Back to Lifts
          </Link>
        </div>
      </div>
    );
  }
}

export default EditLift;
