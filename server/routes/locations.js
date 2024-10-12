import express from "express";
// import controllers for events and locations
import locationsController from "../controllers/locations.js";

const locationsRouter = express.Router();

// define routes to get events and locations
locationsRouter.get("/", locationsController.getLocations);
locationsRouter.get("/:id", locationsController.getLocation);

export default locationsRouter;
