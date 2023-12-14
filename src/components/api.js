const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-2",
  headers: {
    authorization: "3a9b2a6d-c666-465c-a3db-83032603ac9a",
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const returnPromise = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    return returnPromise(res);
  });
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    return returnPromise(res);
  });
};

const patchEditProfile = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then((res) => {
    return returnPromise(res);
  });
};

const postAddCardEl = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return returnPromise(res);
  });
};

const deleteCardEl = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return returnPromise(res);
  });
};

const putaddLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return returnPromise(res);
  });
};

const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return returnPromise(res);
  });
};

const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return returnPromise(res);
  });
};

export {
  getUserData,
  getInitialCards,
  patchEditProfile,
  postAddCardEl,
  putaddLike,
  deleteCardEl,
  removeLike,
  updateAvatar,
};
