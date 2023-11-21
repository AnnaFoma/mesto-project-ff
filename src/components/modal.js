const openModal = (evt) => {
  evt.classList.add("popup_is-animated");
  const modalIsOpened = evt.classList.add("popup_is-opened");
  setTimeout(() => {
    modalIsOpened;
  }, 0);
  document.addEventListener("keydown", CloseByEsc);
};

const closeModal = (evt) => {
  evt.classList.remove("popup_is-opened");
  const modalIsAnimated = evt.classList.remove("popup_is-animated");
  setTimeout(() => {
    modalIsAnimated;
  }, 0);
  document.removeEventListener("keydown", CloseByEsc);
};

function CloseByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const closeModalByMouseClick = () => {
  const modal = document.querySelectorAll(".popup");

  modal.addEventListener("mousedown", function (evt) {
    const modalClose = evt.target.classList.contains("popup__close");
    const modalIsOpened = evt.target.classList.contains("popup_is-opened");

    if (modalIsOpened) {
      closeModal(modal);
    }
    if (modalClose) {
      closeModal(modal);
    }
  });
};

export { openModal, closeModal, closeModalByMouseClick };
