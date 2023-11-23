import "./index.css";
import { initialCards } from "../components/cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";

const cardList = document.querySelector(".places__list");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImg = document.querySelector(".popup_type_image");
const buttonOpenAddCardPopop = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms["new-place"];
const buttonOpenEditFromPopup = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
const editFromModal = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const buttonPopupClose = document.querySelectorAll(".popup__close");

const openImg = (link, name) => {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;

  openModal(popupTypeImg);
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

const addFormNewCard = (evt) => {
  evt.preventDefault();

  const cardObj = {};
  cardObj.name = formNewPlace.elements["place-name"].value;
  cardObj.link = formNewPlace.elements["link"].value;

  cardList.prepend(createCard(cardObj, deleteCard, openImg, likeCard));

  closeModal(modalNewCard);
  formNewPlace.reset();
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  titleProfile.textContent = nameValue;
  descriptionProfile.textContent = jobValue;
  closeModal(editFromModal);
};

initialCards.forEach((card) => {
  addCard(card, deleteCard, openImg, likeCard);
});

buttonOpenAddCardPopop.addEventListener("click", () => {
  openModal(modalNewCard);
});

buttonOpenEditFromPopup.addEventListener("click", () => {
  openModal(editFromModal);
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
});

buttonPopupClose.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    const modalIsOpened = evt.target.closest(".popup");
    closeModal(modalIsOpened);
  });
});

formNewPlace.addEventListener("submit", addFormNewCard);

formEditProfile.addEventListener("submit", handleFormSubmit);
