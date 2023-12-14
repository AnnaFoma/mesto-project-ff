import "./index.css";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserData,
  getInitialCards,
  patchEditProfile,
  postAddCardEl,
  updateAvatar,
} from "../components/api.js";

const cardList = document.querySelector(".places__list");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImg = document.querySelector(".popup_type_image");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector(".popup_type_new-card");
const buttonAddNewCard = modalNewCard.querySelector(".popup__button");
const formNewPlace = document.forms["new-place"];
const newPlaceName = formNewPlace.elements["place-name"];
const newPlaceLink = formNewPlace.elements["link"];
const buttonOpenEditFromPopup = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
const editFromModal = document.querySelector(".popup_type_edit");
const buttonEditProfile = editFromModal.querySelector(".popup__button");
const formEditProfile = document.forms["edit-profile"];
const buttonsPopupClose = document.querySelectorAll(".popup__close");

const updateAvatarPopup = document.querySelector(".popup_type_avatar");
const formUpdateAvatar = document.forms["update-avatar"];
const buttonUpdateAvatar = updateAvatarPopup.querySelector(".popup__button");
const avatarLinkInput = formUpdateAvatar.elements["avatar-link"];

const imgProfileAvatar = document.querySelector(".profile__image");

let userId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    titleProfile.textContent = userData.name;
    descriptionProfile.textContent = userData.about;
    imgProfileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    initialCards.forEach((cardData) => {
      cardList.append(
        createCard(cardData, userId, deleteCard, openImg, likeCard)
      );
    });
  })
  .catch((err) => {
    console.log("Произошла ошибка при загрузке данных: ", err);
  });

const openImg = (cardData) => {
  popupImg.src = cardData.link;
  popupImg.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupTypeImg);
};

const addFormNewCard = (evt) => {
  evt.preventDefault();

  renderSaving(true, buttonAddNewCard);

  postAddCardEl(newPlaceName.value, newPlaceLink.value)
    .then((cardData) => {
      cardList.prepend(
        createCard(cardData, userId, deleteCard, openImg, likeCard)
      );
      closeModal(modalNewCard);
      formNewPlace.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderSaving(false, buttonAddNewCard);
    });
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  renderSaving(true, buttonEditProfile);

  patchEditProfile(nameInput.value, jobInput.value)
    .then((res) => {
      titleProfile.textContent = res.name;
      descriptionProfile.textContent = res.about;

      closeModal(editFromModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderSaving(false, buttonEditProfile);
    });
};

const handleFormSubmitAvatar = (evt) => {
  evt.preventDefault();

  renderSaving(true, buttonUpdateAvatar);

  updateAvatar(avatarLinkInput.value)
    .then((res) => {
      imgProfileAvatar.style.backgroundImage = `url("${res.avatar}")`;
      closeModal(updateAvatarPopup);
      formUpdateAvatar.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderSaving(false, buttonUpdateAvatar);
    });
};

const renderSaving = (isSaving, btn) => {
  if (isSaving) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
};

buttonOpenAddCardPopup.addEventListener("click", () => {
  newPlaceName.value = "";
  newPlaceLink.value = "";
  clearValidation(formNewPlace, validationConfig);
  openModal(modalNewCard);
});

buttonOpenEditFromPopup.addEventListener("click", () => {
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;

  clearValidation(formEditProfile, validationConfig);
  openModal(editFromModal);
});

buttonsPopupClose.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    const modalIsOpened = evt.target.closest(".popup");
    closeModal(modalIsOpened);
  });
});

imgProfileAvatar.addEventListener("click", () => {
  avatarLinkInput.value = "";
  clearValidation(formUpdateAvatar, validationConfig);
  openModal(updateAvatarPopup);
});

formNewPlace.addEventListener("submit", addFormNewCard);

formEditProfile.addEventListener("submit", handleFormSubmit);

formUpdateAvatar.addEventListener("submit", handleFormSubmitAvatar);