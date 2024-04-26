import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import "express-async-errors";

import wageCalculationRoute from "./routes/wageCalculate.route";
import userRoute from "./routes/users.route";
import errorHandler from "../middlewares/errorHandler";

// Express initialization
const app = express();
app.use(bodyParser.json());

// Server Status Endpoint
app.get("/api/status", (req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy!!" });
});

// Routes
app.use("/api", userRoute);
app.use("/api", wageCalculationRoute);

// Error Handling
app.use(errorHandler);

export default app;
