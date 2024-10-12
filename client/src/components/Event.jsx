import React, { useState, useEffect } from "react";
import "../css/Event.css";
import EventsAPI from "../services/EventsAPI";

const Event = (props) => {
  const [event, setEvent] = useState(null); // Initialize event as null

  useEffect(() => {
    (async () => {
      try {
        const eventData = await EventsAPI.getEventsById(props.id);
        console.log(eventData);
        setEvent(eventData[0]); // Set event when fetched
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    })();
  }, [props.id]);

  return (
    <article className="event-information">
      {event ? ( // Conditional rendering based on whether event is available
        <div className="event-information-overlay">
          <div className="text">
            <h3>{event.title}</h3>
            <p>
              <i className="fa-regular fa-calendar fa-bounce"></i>{" "}
              {new Date(event.date).toLocaleString()}{" "}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading event information...</p> // Show loading state while event data is being fetched
      )}
    </article>
  );
};

export default Event;
