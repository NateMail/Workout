export const create = (userId, token, userLift) => {
  console.log(userLift);
  return fetch(`http://localhost:8181/lift/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: userLift
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
