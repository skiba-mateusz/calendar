import Storage from "../Storage";
import DeleteEvent from "./DeleteEvent";

class CalendarEvent {
  #data;
  #date;

  constructor(data, date) {
    this.#data = data;
    this.#date = date;
    this.#initElements();
    this.#focusDescriptionIfEmpty();
    this.#addEventListeners();
  }

  #initElements() {
    this.elements = {};
    this.elements.root = this.#createRoot();
    this.elements.description = this.elements.root.querySelector(
      ".event__description"
    );
  }

  #addEventListeners() {
    const { root, description } = this.elements;

    root.addEventListener("dblclick", this.#onDoubleClick.bind(this));
    description.addEventListener("blur", this.#onBlur.bind(this));
    description.addEventListener("focus", this.#onFocus.bind(this));
  }

  #onDoubleClick() {
    if (!this.#data.id) return;
    new DeleteEvent(this.#data.id);
  }

  #onBlur(e) {
    const description = e.target.textContent.trim();
    e.target.classList.remove("event__description--active");

    if (description === this.#data?.description) return;

    if (!this.#data) {
      if (!description) {
        this.elements.root.remove();
        return;
      }

      const newEvent = {
        description: description,
        date: this.#date,
      };

      this.#data = Storage.createEvent(newEvent);
      this.elements.root.classList.remove("animation-append");
      this.elements.root.setAttribute("data-id", this.#data.id);
    } else {
      if (!description) {
        this.elements.description.textContent = this.#data.description;
        return;
      }

      Storage.updateEvent(this.#data.id, { description });
    }
  }

  #onFocus(e) {
    e.target.classList.add("event__description--active");
  }

  #focusDescriptionIfEmpty() {
    setTimeout(() => {
      if (!this.elements.description.textContent) {
        this.elements.description.focus();
      }
    }, 0);
  }

  #createRoot() {
    const range = document.createRange();

    return range.createContextualFragment(`
      <div class="event" draggable="true" data-id=${
        this.#data?.id
      } style="view-transition-name: event-${this.#data?.id}">
        <p class="event__description" contenteditable="true" role="textbox" aria-label="Event description">${
          this.#data?.description || ""
        }</p>
      </div>  

    `).firstElementChild;
  }
}

export default CalendarEvent;
