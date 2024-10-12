import React, { useState, useEffect } from "react";
import LocationsAPI from "../services/LocationsAPI";
import mapImage from "../assets/pugetSound.png"; // Your map image
import voguePng from "../assets/voguetheatre.png"; // Custom PNG for Vogue Theatre
import climatePledgePng from "../assets/climatepledgearena.png"; // Custom PNG for Climate Pledge Arena
import moorePng from "../assets/mooretheatre.jpg"; // Custom PNG for Moore Theatre
import wamuPng from "../assets/wamutheatre.jpg"; // Custom PNG for WaMu Theatre
import showarePng from "../assets/showarecenter.png"; // Custom PNG for ShoWare Center
import tacomaDomePng from "../assets/tacomadome.svg"; // Custom PNG for Tacoma Dome
import "../css/Locations.css";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(locationsData);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <div className="available-locations">
      <img src={mapImage} alt="Map" className="map-background" />

      <div className="location-overlay" id="voguebutton">
        <img
          src={voguePng}
          alt="Vogue Theatre"
          className="location-icon"
          onClick={() => (window.location.href = "/voguetheatre")}
        />
      </div>

      <div className="location-overlay" id="climatepledgebutton">
        <img
          src={climatePledgePng}
          alt="Climate Pledge Arena"
          className="location-icon"
          onClick={() => (window.location.href = "/climatepledgearena")}
        />
      </div>

      {/* Add other location overlays similarly */}
      <div className="location-overlay" id="moorebutton">
        <img
          src={moorePng}
          alt="Moore Theatre"
          className="location-icon"
          onClick={() => (window.location.href = "/mooretheatre")}
        />
      </div>

      <div className="location-overlay" id="wamubutton">
        <img
          src={wamuPng}
          alt="WaMu Theatre"
          className="location-icon"
          onClick={() => (window.location.href = "/wamutheatre")}
        />
      </div>
      <div className="location-overlay" id="showarebutton">
        <img
          src={showarePng}
          alt="ShoWare Center"
          className="location-icon"
          onClick={() => (window.location.href = "/showarecenter")}
        />
      </div>
      <div className="location-overlay" id="tacomabutton">
        <img
          src={tacomaDomePng}
          alt="Tacoma Dome"
          className="location-icon"
          onClick={() => (window.location.href = "/tacomadome")}
        />
      </div>
    </div>
  );
};

export default Locations;
