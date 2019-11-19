export const create = (userId, token, userBody) => {
  return fetch(`http://localhost:8181/body/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: userBody
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
