import express from "express";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";
import cors from "cors";

// import the router from your routes file
import eventsRouter from "./routes/events.js";
import locationsRouter from "./routes/locations.js";

import { seedTables } from "./config/reset.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from Vite frontend
    methods: "GET,POST,PUT,DELETE", // Specify allowed methods
    credentials: true, // Allow cookies if needed
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.resolve("../", "client", "public", "party.png")));
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve("public", "party.png")));
  app.use(express.static("public"));
}

//reset database
seedTables();
// specify the api path for the server to use
app.use("/events", eventsRouter);
app.use("/locations", locationsRouter);

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) => res.sendFile(path.resolve("public", "index.html")));
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
