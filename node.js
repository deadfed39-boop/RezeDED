const express = require("express");
const fetch = require("node-fetch");
const app = express();

const WEBHOOK_URL = "https://discord.com/api/webhooks/1493637791349870733/QrizbOWu9-PNTJj0pztpp0KZ9d_tc5NujrBLRry3Qnlupw170_sEfKSZ74EdcVPitSOj";

app.use(express.static("public")); // where your HTML file is

app.get("/track", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Send notification (make sure users are informed)
  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: `🌐 Page visit detected\nIP: ${ip}`
    })
  });

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Running on port 3000"));
