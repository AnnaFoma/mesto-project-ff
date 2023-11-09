// @todo: DOM узлы

let cardList = document.querySelector(".places__list");

// @todo: Темплейт карточки
// @todo: Функция создания карточки

createCards = (cardData, deleteCard) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
};

// @todo: Функция удаления карточки

removeCard = (cardElement) => {
  cardElement.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  const cardElement = createCards(card, removeCard);
  cardList.append(cardElement);
});