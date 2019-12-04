// import React, { Component } from "react";
// import { singleBody } from "./apiBody";
// import { Link, Redirect } from "react-router-dom";
// import { isAuthenticated } from "../auth";
// import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

// class SingleBody extends Component {
//   state = {
//     body: "",
//     redirectToHome: false,
//     redirectToSignIn: false
//   };

//   componentDidMount = () => {
//     const bodyId = this.props.match.params.bodyId;
//     const token = isAuthenticated().token;
//     if (!token) {
//       this.setState({ redirectToSignIn: true });
//     } else {
//       singleBody(bodyId, token).then(data => {
//         if (data.error) {
//           console.log(data.error);
//         } else {
//           this.setState({
//             body: data
//           });
//         }
//       });
//     }
//   };

//   renderBody = body => {
//     console.log(body);

//     if (body !== undefined && body.length !== 0) {
//       body.tdee = body.tdee.toFixed(2);
//       body.bmr = body.bmr.toFixed(2);
//       body.lose = (body.tdee - body.tdee * 0.2).toFixed(2);
//     }
//     return (
//       <div className="card-body">
//         <Card style={{ width: "18rem" }}>
//           <Card.Body>
//             <Card.Text>
//               BMR is the base metabolic rate. Which is the bare minimum to
//               sustain life and ensure longevity. TDEE is an estimate of your
//               daily calorie requirements.
//             </Card.Text>
//             <ListGroup className="list-group-flush">
//               <ListGroupItem>
//                 Starting Weight: {body.weight[0]} pounds
//               </ListGroupItem>
//               <ListGroupItem>
//                 Current Weight: {body.weight[body.weight.length - 1]} pounds
//               </ListGroupItem>
//               <ListGroupItem>Height: {body.height} inches</ListGroupItem>
//               <ListGroupItem>Age: {body.age}</ListGroupItem>
//               <ListGroupItem>Sex: {body.sex}</ListGroupItem>
//               <ListGroupItem>BMR: {body.bmr} calories</ListGroupItem>
//               <ListGroupItem>TDEE: {body.tdee} calories</ListGroupItem>
//               <ListGroupItem>
//                 Lose around one pound a week:
//                 <hr />
//                 {body.lose} calories a day
//               </ListGroupItem>
//             </ListGroup>
//           </Card.Body>
//         </Card>

//         {isAuthenticated().user && isAuthenticated().user._id === body.addedBy && (
//           <>
//             {
//               <Link
//                 to={`/body/edit/${body._id}`}
//                 className="btn btn-raised btn-warning btn-sm mr-5"
//               >
//                 Update body
//               </Link>
//             }
//           </>
//         )}
//       </div>
//     );
//   };

//   render() {
//     const { body, redirectToHome, redirectToSignIn } = this.state;

//     if (redirectToHome) {
//       return <Redirect to={"/"} />;
//     } else if (redirectToSignIn) {
//       return <Redirect to={"/signin"} />;
//     }
//     return (
//       <div className="container">
//         {!body ? (
//           <div className="jumbotron text-center">
//             <h2>Loading...</h2>
//           </div>
//         ) : (
//           this.renderBody(body)
//         )}
//       </div>
//     );
//   }
// }

// export default SingleBody;
