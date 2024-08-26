import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";

class Calendar {
  #date = new Date();
  #elements = {};

  constructor() {
    this.#initElements();
    this.#render();
    this.#addEventListeners();
  }

  #initElements() {
    this.#elements.month = document.querySelector(".calendar__month");
    this.#elements.title = document.querySelector("#calendar-title");
    this.#elements.nav = document.querySelector(".calendar__nav");
    this.#elements.thead = document.querySelector(".calendar__thead tr");
    this.#elements.tbody = document.querySelector(".calendar__tbody tr");
  }

  #render() {
    this.#clear();
    this.#createHeadersAndDays();
    this.#updateCurrentMonth();
    this.#updateTitle();
  }

  #addEventListeners() {
    const { nav } = this.#elements;

    nav.addEventListener("click", this.#onNavClick.bind(this));
  }

  #onNavClick(e) {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.classList.contains("calendar__btn--prev")) this.#changeWeek(-1);
    if (btn.classList.contains("calendar__btn--today")) this.#resetDate();
    if (btn.classList.contains("calendar__btn--next")) this.#changeWeek(+1);

    this.#render();
  }

  #changeWeek(offset) {
    this.#date.setDate(this.#date.getDate() + offset * 7);
  }

  #resetDate() {
    this.#date = new Date();
  }

  #createHeadersAndDays() {
    const dates = this.#generateWeekDatesArr();
    dates.forEach((date) => {
      const headerView = new CalendarHeader(date);
      const dayView = new CalendarDay(date);
      this.#elements.thead.appendChild(headerView.elements.root);
      this.#elements.tbody.appendChild(dayView.elements.root);
    });
  }

  #clear() {
    this.#elements.thead.innerHTML = "";
    this.#elements.tbody.innerHTML = "";
  }

  #updateCurrentMonth() {
    this.#elements.month.textContent = new Intl.DateTimeFormat("en-us", {
      month: "long",
      year: "numeric",
    }).format(this.#date);
    this.#updateTitle();
  }

  #updateTitle() {
    const dates = this.#generateWeekDatesArr();

    const formatter = new Intl.DateTimeFormat("en-us", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const startDate = formatter.format(new Date(dates[0]));
    const endDate = formatter.format(new Date(dates[dates.length - 1]));

    this.#elements.title.textContent = `Calendar for the week of ${startDate} to ${endDate}`;
  }

  #generateWeekDatesArr(date = this.#date) {
    const dates = [];

    const startDate = new Date(date);
    const dayOfWeek = startDate.getDay() || 6;
    startDate.setDate(startDate.getDate() - (dayOfWeek - 1));

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate);
      dates.push(currentDay);
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates.map((day) => this.#formatDate(day));
  }

  #formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

export default Calendar;
