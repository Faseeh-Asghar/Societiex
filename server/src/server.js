import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import Society from './models/Society.js';
import { seedDatabase } from './utils/seedData.js';

const PORT = process.env.PORT || 5000;

// Connect to Database & Launch Server
const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed if database is currently empty (for zero-setup dev experience)
    const societyCount = await Society.countDocuments();
    if (societyCount === 0) {
      console.log('[Server] Database is empty. Running initial seeder...');
      await seedDatabase(false);
    }

    const server = app.listen(PORT, () => {
      console.log(`[API] SOCIETIX Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`[API] Health check: http://localhost:${PORT}/api/health`);
    });

    // Graceful Shutdown Handling
    const shutdown = async (signal) => {
      console.log(`\n[API] Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    console.error(`[API] Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

startServer();
