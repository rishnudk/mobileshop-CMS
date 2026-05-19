import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import authRoutes from "./modules/auth/auth.routes";
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

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
