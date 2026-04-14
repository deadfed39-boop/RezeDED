const express = require("express");
const path = require("path");

const app = express();

// Railway provides its own port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Main route (site)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Optional API endpoint (user-triggered)
app.post("/send", async (req, res) => {
  try {
    const userData = {
      time: new Date().toISOString(),
      userAgent: req.headers["user-agent"],
      body: req.body
    };

    console.log("Received:", userData);

    // OPTIONAL: Discord webhook (ONLY if you want it)
    // const fetch = require("node-fetch");
    // await fetch("https://discord.com/api/webhooks/1493637791349870733/QrizbOWu9-PNTJj0pztpp0KZ9d_tc5NujrBLRry3Qnlupw170_sEfKSZ74EdcVPitSOj", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     content: "New request:\n```" + JSON.stringify(userData, null, 2) + "```"
    //   })
    // });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
