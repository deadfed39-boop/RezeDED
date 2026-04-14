async function sendMessage() {
  const res = await fetch("/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "User clicked the button on the site"
    })
  });

  const data = await res.json();

  if (data.success) {
    alert("Sent to Discord!");
  } else {
    alert("Failed to send");
  }
}
