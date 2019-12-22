import React, { Component } from "react";
import { update, singleBody } from "./apiBody";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class EditBody extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      height: 0,
      weight: [],
      weightToPush: 0,
      sex: "",
      age: 0,
      activity: 0,
      redirectToHome: false,
      error: "",
      loading: false
    };
  }

  init = bodyId => {
    const token = isAuthenticated().token;
    singleBody(bodyId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToHome: true });
      } else {
        this.setState({
          name: data.addedBy.name,
          id: data.addedBy,
          height: data.height,
          weight: data.weight,
          age: data.age,
          sex: data.sex,
          activity: data.activity,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.bodyData = new FormData();
    const bodyId = this.props.match.params.bodyId;
    this.init(bodyId);
  }

  isValid = () => {
    const { weightToPush, age, height, activity } = this.state;
    if (weightToPush <= 0 || activity <= 0 || height <= 0 || age <= 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.bodyData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const bodyId = this.props.match.params.bodyId;
      const token = isAuthenticated().token;

      update(bodyId, token, this.bodyData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            sex: "",
            weight: [],
            weightToPush: 0,
            height: 0,
            age: 0,
            activity: 0,
            redirectToProfile: true
          });
        }
      });
    }
  };

  editBodyForm = (height, age, weightToPush, activity) => (
    <form
      style={{
        color: "white",
        background: "#172B3E"
      }}
    >
      <div className="form-group">
        <label>Height in inches</label>
        <input
          onChange={this.handleChange("height")}
          type="number"
          className="form-control"
          value={height}
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          onChange={this.handleChange("age")}
          type="number"
          className="form-control"
          value={age}
        />
      </div>
      <div className="form-group">
        <label>Current weight in pounds</label>
        <input
          onChange={this.handleChange("weightToPush")}
          type="number"
          className="form-control"
          value={weightToPush}
        />
      </div>
      <div>
        <h6 style={{ marginBottom: "10px" }}>Activity Level</h6>
        <ul>
          <li>Sedentary: Little to no exercise</li>
          <li>Lightly Active: Light exerciese 1-3 days per week</li>
          <li>Moderately Active: Moderate exercise 3-5 days per week</li>
          <li>Very Active: Heavy exercise 6-7 days per week</li>
          <li>Extremely Active: Very heavy exercise, training 2X per day</li>
        </ul>
        <select
          style={{ marginBottom: "20px" }}
          className="form-control"
          value={activity}
          onChange={this.handleChange("activity")}
        >
          <option value="1.2">Sedentary</option>
          <option value="1.375">Lightly Active</option>
          <option value="1.55">Moderately Active</option>
          <option value="1.725">Very Active</option>
          <option value="1.9">Extremely Active</option>
        </select>
      </div>

      <button
        style={{ margin: "10px" }}
        onClick={this.clickSubmit}
        className="btn btn-raised btn-primary"
      >
        Update Body
      </button>
    </form>
  );

  render() {
    const {
      id,
      name,
      age,
      activity,
      height,
      weightToPush,
      redirectToProfile,
      error,
      loading
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/body/by/${isAuthenticated().user._id}`} />;
    }

    return (
      <div style={{ background: "#172B3E", height: "100vh" }}>
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
          this.editBodyForm(height, age, weightToPush, activity)}
      </div>
    );
  }
}

export default EditBody;
