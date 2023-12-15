const openModal = (popup) => {
  popup.classList.add("popup_is-animated", "popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("click", closeModalByMouseClick);
};

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("click", closeModalByMouseClick);
};

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeModalByMouseClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

export { openModal, closeModal };
