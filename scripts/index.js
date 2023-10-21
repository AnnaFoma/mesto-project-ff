// @todo: DOM узлы

let cardList = document.querySelector(".places__list");

// @todo: Темплейт карточки
// @todo: Функция создания карточки

addCards = (el) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = el.link;
  cardElement.querySelector(".card__title").textContent = el.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
};

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  const cardElement = addCards(card);
  cardList.append(cardElement);
});

// @todo: Функция удаления карточки

deleteCard = (cardElement) => {
  cardElement.remove();
};