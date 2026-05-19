import * as dotenv from "dotenv";
// Load env before other imports
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Mobile CMS Backend Online!`);
  console.log(`🚀 Running in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`🚀 Listening on http://localhost:${PORT}`);
  console.log(`=================================`);
});

// Handle termination signals gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down server gracefully...");
  server.close(() => {
    console.log("Process terminated.");
  });
});
