import express from "express";

const app = express();

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
