import { formatDate } from "./utils/helpers";

const sampleData = [
  { id: 1, description: "Try to drag me", date: formatDate(new Date()) },
  { id: 2, description: "Try to edit me", date: formatDate(new Date()) },
  { id: 3, description: "Double click on me", date: formatDate(new Date()) },
];

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

  static updateEvent(eventID, newEvent) {
    const events = loadEvents();
    const updatedEvents = events.map((event) =>
      event.id !== eventID ? event : { ...event, ...newEvent }
    );
    saveEvents(updatedEvents);
  }

  static deleteEvent(eventID) {
    let events = loadEvents();
    events = events.filter((event) => event.id !== +eventID);
    saveEvents(events);
  }

  static getEventsByDate(date) {
    return loadEvents().filter((event) => event.date === date);
  }
}

const loadEvents = () => {
  return JSON.parse(localStorage.getItem("events")) ?? sampleData;
};

const saveEvents = (events) => {
  localStorage.setItem("events", JSON.stringify(events));
};

export default Storage;
