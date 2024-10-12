import express from "express";
// import controllers for events and locations
import eventsController from "../controllers/events.js";

const eventsRouter = express.Router();

// define routes to get events and locations
eventsRouter.get("/", eventsController.getEvents);
eventsRouter.get("/:id", eventsController.getEvent);

export default eventsRouter;
