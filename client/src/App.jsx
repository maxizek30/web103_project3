import React from "react";
import { useRoutes, Link } from "react-router-dom";
import Locations from "./pages/Locations";
import LocationEvents from "./pages/LocationEvents";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Locations />,
    },
    {
      path: "/voguetheatre",
      element: <LocationEvents index={1} />,
    },
    {
      path: "/climatepledgearena",
      element: <LocationEvents index={2} />,
    },
    {
      path: "/mooretheatre",
      element: <LocationEvents index={3} />,
    },
    {
      path: "/wamutheatre",
      element: <LocationEvents index={4} />,
    },
    {
      path: "/showarecenter",
      element: <LocationEvents index={5} />,
    },
    {
      path: "/tacomadome",
      element: <LocationEvents index={6} />,
    },
  ]);

  return (
    <div className="app">
      <header className="main-header">
        <h1>Puget Sound Concerts</h1>

        <Link to="/" role="button">
          Home
        </Link>
      </header>

      <main>{element}</main>
    </div>
  );
};

export default App;
