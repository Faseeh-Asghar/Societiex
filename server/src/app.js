import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/error.middleware.js';
import AppError from './utils/AppError.js';

// Route Imports
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import societyRoutes from './routes/society.routes.js';
import eventRoutes from './routes/event.routes.js';
import joinRequestRoutes from './routes/joinRequest.routes.js';
import rsvpRoutes from './routes/rsvp.routes.js';
import announcementRoutes from './routes/announcement.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. CORS Configuration
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// 2. Body Parsing & Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// 3. Static Uploads Folder
const uploadDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadDir));

// 4. API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SOCIETIX API Gateway is healthy and running.',
    timestamp: new Date().toISOString(),
  });
});

// 5. Mount API v1 Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/societies', societyRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/join-requests', joinRequestRoutes);
app.use('/api/v1/rsvps', rsvpRoutes);
app.use('/api/v1/announcements', announcementRoutes);

// 6. 404 Handler for Unmatched API Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot ${req.method} ${req.originalUrl} on this server.`, 404));
});

// 7. Global Error Handler
app.use(errorHandler);

export default app;
