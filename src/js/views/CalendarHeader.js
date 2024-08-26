class CalendarHeader {
  #date;
  constructor(date) {
    this.#date = date;
    this.#initElements();
  }

  #initElements() {
    this.elements = {};
    this.elements.root = this.#createRoot();
  }

  #createRoot() {
    const range = document.createRange();

    const dateObj = new Date(this.#date);
    const dayName = new Intl.DateTimeFormat("en-us", {
      weekday: "long",
    }).format(dateObj);
    const dayNum = new Intl.DateTimeFormat("en-us", {
      day: "numeric",
    }).format(dateObj);
    const monthName = new Intl.DateTimeFormat("en-us", {
      month: "long",
    }).format(dateObj);
    const year = dateObj.getFullYear();

    const fragment = range.createContextualFragment(`
      <table>
        <tr>
          <th class="flow" scope="col" aria-label="${dayName}, ${monthName} ${dayNum}, ${year}">
            <div class="calendar__weekday">
              ${dayName}
            </div>
            <div class="calendar__date ${
              this.#isToday(dateObj) ? "calendar__date--today" : ""
            }">
              ${dayNum} of ${monthName}
            </div>
          </th>
        </tr>
      </table>
    `);

    return fragment.querySelector("th");
  }

  #isToday(date) {
    const currentDate = new Date();
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate()
    );
  }
}

export default CalendarHeader;
