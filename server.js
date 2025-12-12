// 1. IMPORT & CONFIGURATION SECTION
// Loads our env files that hold our environment variables
require('dotenv').config();

// Importing required modules
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// Fetching and Storing env variables info into constants
const mongouri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const port = 3000;

// Creates express app
const app = express();

// Connects to mongoDb via the uri
const client = new MongoClient(mongouri);

// 2. MIDDLEWARE SECTION
// Middleware that intercepts incoming requests which puts the data into req.body object in JSON form
app.use(express.json());
// server.js (Place AFTER all other API routes)



// Middleware to allow cross-origin requests from the frontend
app.use(cors());

// 3. CONNECTION FUNCTION
// Function to connect to DB
async function connectToDb() {
    try {
        await client.connect();
        const db = client.db(dbName);
        return db.collection('passwords');
    } catch (err) {
        console.error("Could not connect to MongoDB:", err);
        throw err;
    }
}

// 4. API ROUTES (CRUD)

// API route to fetch all passwords (READ)
app.get('/passwords', async (req, res) => {
    let collection;
    try {
        // Calls the connection function
        collection = await connectToDb();
        // Retrieves all documents in the collection and converts them into an array
        const doc = await collection.find({}).toArray();
        res.json(doc); // ARRAY - JSON conversion
    } catch (err) {
        console.error("Error fetching passwords:", err);
        res.status(500).send({ success: false, message: "Failed to fetch data." });
    }
});

// API route to save a new password (CREATE)
app.post('/passwords', async (req, res) => {
    let collection;
    try {
        // The new passwords are taken from here (available from app.use which puts them into req.body)
        const newPassword = req.body;
        collection = await connectToDb();
        // Adds the new password to the DB
        const result = await collection.insertOne(newPassword);
        res.status(201).send({
            success: true,
            message: "Password saved successfully.",
            insertedId: result.insertedId
        });
    } catch (error) {
        console.error("Error saving password:", error);
        res.status(500).send({ success: false, message: "Failed to save data." });
    }
});

// API route for deleting passwords (DELETE)
app.delete('/passwords', async (req, res) => {
    let collection;
    try {
        // We destructure (grab) out id field from the request body
        const { id } = req.body;
        collection = await connectToDb();
        // Deletes the document based on the id reference
        const result = await collection.deleteOne({ id: id });
        if (result.deletedCount === 1) {
            res.send({ success: true, message: "Password deleted successfully." });
        } else {
            // This happens if the ID didn't match any document
            res.status(404).send({ success: false, message: "Password not found." });
        }
    } catch (error) {
        console.error("Error deleting password:", error);
        res.status(500).send({ success: false, message: "Failed to delete data." });
    }
});

//Default middleware to handle undefined paths
app.use((req, res) => {
    res.status(404).send({ success: false, message: "API Endpoint Not Found." });
});

// 5. SERVER START

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});