import React, { Component } from "react";
import { singleBody } from "./apiBody";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SingleBody extends Component {
  state = {
    body: "",
    redirectToHome: false,
    redirectToSignIn: false
  };

  componentDidMount = () => {
    const bodyId = this.props.match.params.bodyId;
    const token = isAuthenticated().token;
    if (!token) {
      this.setState({ redirectToSignIn: true });
    } else {
      singleBody(bodyId, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            body: data
          });
        }
      });
    }
  };

  renderBody = body => {
    console.log(body);
    return (
      <div className="card-body">
        <ul>
          <li className="card-text">{body.weight[body.weight.length - 1]}</li>
          <li className="card-text">{body.height}</li>
          <li className="card-text">{body.sex}</li>
          <li className="card-text">{body.activity}</li>
        </ul>
        <br />

        <div className="d-inline-block">
          <Link
            to={`/body/by/${body.addedBy}`}
            className="btn btn-raised btn-primary btn-sm mr-5"
          >
            Back to body
          </Link>

          {isAuthenticated().user &&
            isAuthenticated().user._id === body.addedBy && (
              <>
                {
                  <Link
                    to={`/body/edit/${body._id}`}
                    className="btn btn-raised btn-warning btn-sm mr-5"
                  >
                    Update body
                  </Link>
                }
              </>
            )}
        </div>
      </div>
    );
  };

  render() {
    const { body, redirectToHome, redirectToSignIn } = this.state;

    if (redirectToHome) {
      return <Redirect to={"/"} />;
    } else if (redirectToSignIn) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div className="container">
        {!body ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderBody(body)
        )}
      </div>
    );
  }
}

export default SingleBody;
