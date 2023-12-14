import { putaddLike, deleteCardEl, removeLike } from "../components/api.js";

const createCard = (
  cardData,
  userId,
  callbackdeleteCard,
  callbackOpenModal,
  callbackLikeCard
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__count-like");
  const cardElementImg = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");

  cardElementImg.src = cardData.link;
  cardElementImg.alt = cardData.name;
  cardElementTitle.textContent = cardData.name;
  likesCounter.textContent = cardData.likes.length;

  deleteButton.addEventListener("click", (evt) => {
    callbackdeleteCard(evt, cardData);
  });

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  if (cardData.likes.some((owner) => owner._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  cardElementImg.addEventListener("click", () => {
    callbackOpenModal(cardData);
  });

  likeButton.addEventListener("click", () => {
    callbackLikeCard(cardElement, userId, cardData);
  });

  return cardElement;
};

const deleteCard = (evt, cardData) => {
  const cardElement = evt.target.closest(".card");
  deleteCardEl(cardData._id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeCard = (cardElement, userId, cardData) => {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__count-like");

  if ((owner) => owner._id !== userId) {
    putaddLike(cardData._id)
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(cardData._id)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export { createCard, deleteCard, likeCard };
