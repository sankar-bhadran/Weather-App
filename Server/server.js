import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

// dotenv.config();
const app = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.get("/", (req, res) => {
  return res.send("Hai Everyone");
});

app.listen(3000, () => {
  console.log("connected to server 3000");
});
