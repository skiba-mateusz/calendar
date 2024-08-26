class CalendarDay {
  #date;

  constructor(date) {
    this.#date = date;
    this.#initElements();
  }

  #initElements() {
    this.elements = {};
    this.elements.root = this.#createRoot();
    this.elements.events = this.elements.root.querySelector(".events");
    this.elements.addEventBtn = this.elements.root.querySelector("button");
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
