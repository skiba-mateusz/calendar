import Storage from "../Storage";

class DeleteEvent {
  #eventID;
  #elements;

  constructor(eventID) {
    this.#eventID = eventID;
    this.#initElements();
    this.#addEventListeners();
  }

  #initElements() {
    this.#elements = {};
    this.#elements.root = this.#createRoot();
    this.#elements.confirmBtn = this.#elements.root.querySelector(
      ".modal__btn-confirm"
    );
    this.#elements.closeBtns =
      this.#elements.root.querySelectorAll(".modal__btn-close");
    document.body.appendChild(this.#elements.root);
    this.#elements.root.showModal();
  }

  #addEventListeners() {
    const { closeBtns, confirmBtn, root } = this.#elements;

    closeBtns.forEach((btn) =>
      btn.addEventListener("click", this.#onCloseBtnClick.bind(this))
    );
    confirmBtn.addEventListener("click", this.#onConfirmBtnClick.bind(this));
    root.addEventListener("keydown", this.#onKeyDown.bind(this));
  }

  #onConfirmBtnClick() {
    const eventElement = document.querySelector(
      `.event[data-id="${this.#eventID}"]`
    );

    Storage.deleteEvent(this.#eventID);
    this.#elements.root.close();
    eventElement.remove();
  }

  #onCloseBtnClick() {
    this.#elements.root.close();
    this.#elements.root.remove();
  }

  #onKeyDown(e) {
    if (e.key === "Escape") {
      this.#elements.root.remove();
    }
  }

  #createRoot() {
    const range = document.createRange();

    return range.createContextualFragment(`
      <dialog class="modal">
        <header class="modal__header">
          <h2 class="modal__title">Delete Event</h2>
          <button class="modal__btn-close btn btn--transparent btn--icon">
            <i class='bx bx-x' aria-hidden="true"></i>
          </button>
        </header>
        <div class="modal__content flow">
          <p>Are you sure you want to delete this event?</p>
          <div class="flex">
            <button class="modal__btn-confirm btn btn--secondary">Confirm</button>
            <button class="modal__btn-close btn btn--primary w-full">Cancel</button>
          </div>
        </div>
      </dialog>  
    `).firstElementChild;
  }
}

export default DeleteEvent;
