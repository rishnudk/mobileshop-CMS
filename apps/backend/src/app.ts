import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import authRoutes from "./modules/auth/auth.routes";
import partyRoutes from "./modules/parties/party.routes";
import complaintRoutes from "./modules/complaints/complaint.routes";
import userRoutes from "./modules/users/user.routes";
import settingsRoutes from "./modules/settings/settings.routes";
import { errorMiddleware } from "./common/middleware/error.middleware";

const app = express();

// Standard Production Middlewares
app.use(helmet());
app.use(cors({
  origin: "*", // Adjust for specific client domains in production
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// App Router Registry
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/parties", partyRoutes);
app.use("/api/v1/complaints", complaintRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/settings", settingsRoutes);


app.use(errorMiddleware);

export default app;
