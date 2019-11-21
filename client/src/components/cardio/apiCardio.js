export const create = (userId, token, userCardio) => {
  console.log(userCardio);
  return fetch(`http://localhost:8181/cardio/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: userCardio
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
