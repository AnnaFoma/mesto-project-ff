import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeModalByMouseClick,
} from "./components/modal.js";

const cardList = document.querySelector(".places__list");
const addBtn = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms["new-place"];
const editBtn = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
const editFromModal = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const modalCloseBtn = document.querySelectorAll(".popup__close");

const openImg = (link, name) => {
  document.querySelector(".popup__image").src = link;
  document.querySelector(".popup__image").alt = name;
  document.querySelector(".popup__caption").textContent = name;

  openModal(document.querySelector(".popup_type_image"));
};

const addCard = (
  cardObj,
  callbackOpenModal,
  callbackdeleteCard,
  callbackLikeCard
) => {
  cardList.append(
    createCard(cardObj, callbackOpenModal, callbackdeleteCard, callbackLikeCard)
  );
};

initialCards.forEach((card) => {
  addCard(card, deleteCard, openImg, likeCard);
});

addBtn.addEventListener("click", () => {
  openModal(modalNewCard);
});

const addFormNewCard = (evt) => {
  evt.preventDefault();

  const cardObj = {};
  cardObj.name = formNewPlace.elements["place-name"].value;
  cardObj.link = formNewPlace.elements["link"].value;

  cardList.prepend(createCard(cardObj, deleteCard, openImg, likeCard));

  closeModal(modalNewCard);
  formNewPlace.reset();
};

formNewPlace.addEventListener("submit", addFormNewCard);

const sendingForm = (evt) => {
  evt.preventDefault();
  titleProfile.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  closeModal(editFromModal);
};

editBtn.addEventListener("click", () => {
  openModal(editFromModal);
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
});

formEditProfile.addEventListener("submit", sendingForm);

modalCloseBtn.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    const modalIsOpened = evt.target.closest(".popup");
    closeModal(modalIsOpened);
  });
});

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  titleProfile.textContent = nameValue;
  descriptionProfile.textContent = jobValue;
  closeModal(document.querySelector(".popup_type_edit"));
};

formEditProfile.addEventListener("submit", handleFormSubmit);

closeModalByMouseClick();