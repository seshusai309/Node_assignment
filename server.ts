import { MongoClient } from "mongodb";
const express = require("express");
const bodyParser = require("body-parser");

async function start() {
  try {
    //Connecting to MongoDB
    const app = express();

    const uri = "mongodb://localhost:27017/user_details"; // Local MongoDB URI
    const client = new MongoClient(uri);

    await client.connect();
    console.log("Connected to MongoDB");

    // api routes
    app.use("/usersdetails", require("./routes/users"));

    //listening to the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }
}

start();
const uri = "mongodb://localhost:27017/user_details"; // Local MongoDB URI
const client = new MongoClient(uri);

export const getDb = () => client.db("UserDetails"); // Database name
