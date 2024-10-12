import locationData from "../data/locations.js";
import eventData from "../data/events.js";
import { pool } from "./database.js";
import "./dotenv.js";

const createTables = async () => {
  // Drop the events table first because it has a foreign key reference to the locations table
  const dropEventsTableQuery = `
    DROP TABLE IF EXISTS events;
  `;

  // Drop the locations table next
  const dropLocationsTableQuery = `
    DROP TABLE IF EXISTS locations;
  `;

  // Now, recreate the locations table
  const createLocationsTableQuery = `
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Then recreate the events table with the foreign key reference
  const createEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date TIMESTAMP NOT NULL,
      location_id INTEGER REFERENCES locations(id),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  try {
    // Drop events and locations first to reset them
    await pool.query(dropEventsTableQuery);
    await pool.query(dropLocationsTableQuery);
    console.log("Tables dropped successfully");

    // Recreate tables
    await pool.query(createLocationsTableQuery);
    console.log("🎉 Locations table created successfully");

    await pool.query(createEventsTableQuery);
    console.log("🎉 Events table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating tables", err);
  }
};

const seedLocations = async () => {
  for (const location of locationData) {
    const { name, description } = location;
    const insertLocationQuery = `
      INSERT INTO locations (name, description)
      VALUES ($1, $2)
      RETURNING id;
    `;
    try {
      const res = await pool.query(insertLocationQuery, [name, description]);
      console.log(`🌱 Inserted location: ${name}`);
    } catch (err) {
      console.error("⚠️ error inserting location", err);
    }
  }
};

const seedEvents = async () => {
  for (const event of eventData) {
    const { title, description, date, location_id } = event;
    const insertEventQuery = `
      INSERT INTO events (title, description, date, location_id)
      VALUES ($1, $2, $3, $4)
    `;
    try {
      const res = await pool.query(insertEventQuery, [
        title,
        description,
        date,
        location_id,
      ]);
      console.log(`🌱 Inserted event: ${title}`);
    } catch (err) {
      console.error("⚠️ error inserting event", err);
    }
  }
};

const seedTables = async () => {
  await createTables();
  await seedLocations(); // Ensures locations are seeded first
  await seedEvents(); // Events are seeded only after locations are inserted
};

export { seedTables };
