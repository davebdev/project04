const express = require("express");
const app = express();

const port = process.env.PORT || 3001; // Note: using a different port to normal

app.use(express.json());
app.use(express.static("./client/build"));


app.get("/api/test", (req, res) => {
  res.json({ result: "success" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});