class Event {
  constructor(description, date) {
    this.id = Math.floor(Math.random() * Date.now());
    this.description = description;
    this.date = date;
  }
}

class Storage {
  static createEvent(data) {
    const events = loadEvents();
    const event = new Event(data.description, data.date);
    events.push(event);
    saveEvents(events);
    return event;
  }

  static getEventsByDate(date) {
    return loadEvents().filter((event) => event.date === date);
  }
}

const loadEvents = () => {
  return JSON.parse(localStorage.getItem("events")) ?? [];
};

const saveEvents = (events) => {
  localStorage.setItem("events", JSON.stringify(events));
};

export default Storage;
