import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import errorHandling from "./middlewares/input-error/errorHandler.js";
import authRoutes from "./routes/auth.route.js";
import testingRoutes from "./routes/testing.route.js";
import sysadminRoutes from "./routes/sysadmin.route.js";
import performance from "./routes/performance-testing.route.js";

dotenv.config();
const app = express();

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Try again in one hour.",
});
app.use(express.json({ limit: "5kb" }));
app.use("/api", limiter);
app.use(cors());

app.use("/api/sysadmin/", sysadminRoutes);
app.use("/api/testing", testingRoutes);
app.use("/api/performance", performance);
app.use("/api/auth", authRoutes);

app.use(errorHandling);

const PORT_SERVER = process.env.PORT_SERVER || 5000;
app.listen(PORT_SERVER, () => {
  console.log("Server started at http://localhost:" + PORT_SERVER);
});
