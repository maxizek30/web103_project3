import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import "../css/LocationEvents.css";
import EventsAPI from "../services/EventsAPI";
import LocationsAPI from "../services/LocationsAPI";

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState(null); // Change initial state to null
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const eventsData = await EventsAPI.getallEvents();
        const filteredEvents = eventsData.filter(
          (event) => event.location_id === index
        );
        setEvents(filteredEvents);

        const locationData = await LocationsAPI.getLocationById(index);

        setLocation(locationData[0]); // Set location when data is fetched
      } catch (error) {
        console.error("Error fetching events or location data:", error);
      }
    })();
  }, [index]);

  return (
    <div className="location-events">
      <header>
        <div className="location-info">
          {location ? ( // Only render location info when it's available
            <>
              <h2>{location.name}</h2>
              <p>{location.description}</p>
            </>
          ) : (
            <p>Loading location information...</p>
          )}
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
