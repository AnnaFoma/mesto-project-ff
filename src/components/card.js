// @todo: Темплейт карточки
// @todo: Функция создания карточки
const createCard = (
  cardData,
  callbackdeleteCard,
  callbackOpenModal,
  callbackLikeCard
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardElementImg = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");

  cardElementImg.src = cardData.link;
  cardElementImg.alt = cardData.name;
  cardElementTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    callbackdeleteCard(cardElement);
  });

  cardElementImg.addEventListener("click", () => {
    callbackOpenModal(cardElementImg.src, cardElementTitle.textContent);
  });

  cardElement.addEventListener("click", (evt) => {
    if (evt.target === cardElement.querySelector(".card__like-button")) {
      callbackLikeCard(evt);
    } else {
      false;
    }
  });

  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => {
  cardElement.remove();
};

// @todo: Функция лайка карточки
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, likeCard };
