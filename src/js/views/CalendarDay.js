import CalendarEvent from "./CalendarEvent";

class CalendarDay {
  #date;

  constructor(date) {
    this.#date = date;
    this.#initElements();
    this.#addEventListeners();
  }

  #initElements() {
    this.elements = {};
    this.elements.root = this.#createRoot();
    this.elements.events = this.elements.root.querySelector(".events");
    this.elements.addEventBtn = this.elements.root.querySelector("button");
  }

  #addEventListeners() {
    const { addEventBtn } = this.elements;

    addEventBtn.addEventListener("click", this.#onAddEventClick.bind(this));
  }

  #onAddEventClick() {
    const eventElement = this.#createEvent(null);
    eventElement.classList.add("animation-append");
    this.elements.events.appendChild(eventElement);
  }

  #createEvent(data, day = this.#date) {
    const eventElement = new CalendarEvent(data, day).elements.root;
    return eventElement;
  }

  #createRoot() {
    const range = document.createRange();

    const dateObj = new Date(this.#date);
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(dateObj);
    const dayNumber = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
    }).format(dateObj);
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(dateObj);
    const year = dateObj.getFullYear();

    const fragment = range.createContextualFragment(`
      <table>
        <tr>
          <td class="calendar__day" aria-label="${dayName}, ${monthName} ${dayNumber}, ${year}">
            <div class="events"></div>
            <button class="calendar__btn calendar__btn--add-event btn btn--primary">
              <i class='bx bx-plus' aria-hidden="true"></i> 
              Add Event <span class="sr-only">on ${dayName}, ${monthName} ${dayNumber}, ${year}</span>
            </button>
          </td>
        </tr>
      </table>
    `);

    return fragment.querySelector("td");
  }
}

export default CalendarDay;
