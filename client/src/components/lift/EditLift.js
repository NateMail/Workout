import React, { Component } from "react";
import { singleLift, update } from "./apiLift";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

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
        <label className="text-muted">Weight</label>
        <input
          onChange={this.handleChange("weight")}
          type="number"
          className="form-control"
          value={weight}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Reps</label>
        <input
          onChange={this.handleChange("reps")}
          type="number"
          className="form-control"
          value={reps}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Sets</label>
        <input
          onChange={this.handleChange("sets")}
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
      return <Redirect to={`/`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{workoutName}</h2>

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
      </div>
    );
  }
}

export default EditLift;
