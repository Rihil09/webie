const express = require("express");

const app = express();
const PORT = 3000;

// Allow the server to receive JSON data
app.use(express.json());

// Serve files from the "public" folder
app.use(express.static("public"));

// Store the latest message
let latestMessage = "Waiting for message...";

// Receive a message from the Raspberry Pi
app.post("/message", (req, res) => {
    latestMessage = req.body.message;

    console.log("Received:", latestMessage);

    res.json({
        success: true
    });
});

// Send the latest message to the website
app.get("/latest", (req, res) => {
    res.json({
        message: latestMessage
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});