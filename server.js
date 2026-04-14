const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// serve site
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// webhook endpoint (ONLY when user clicks button)
app.post("/send", async (req, res) => {
  try {
    const payload = {
      message: req.body.message,
      time: new Date().toISOString(),
      userAgent: req.headers["user-agent"]
    };

    await fetch(process.env.WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "📩 User message:\n```" + JSON.stringify(payload, null, 2) + "```"
      })
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
