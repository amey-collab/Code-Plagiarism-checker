const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('../database/connection');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const compareRoutes = require('./routes/compare');
const historyRoutes = require('./routes/history');
const reportRoutes = require('./routes/report');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/compare', compareRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/report', reportRoutes);

const startServer = async () => {
  try {
    await connectDB();
    const basePort = Number(process.env.PORT || 5000);
    const startListening = (port) => {
      const server = app.listen(port, () => {
        console.log(`Code Plagiarism backend listening on port ${port}`);
      });
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          const fallbackPort = port + 1;
          if (fallbackPort <= basePort + 2) {
            console.warn(`Port ${port} is in use. Trying ${fallbackPort} instead.`);
            startListening(fallbackPort);
            return;
          }
          console.error(`Ports ${basePort}-${basePort + 2} are unavailable. Stop the other backend instance or change PORT in backend/.env.`);
        } else {
          console.error('Server startup error:', err.message);
        }
        process.exit(1);
      });
    };

    startListening(basePort);
  } catch (startupError) {
    console.error('Startup failed:', startupError.message);
    process.exit(1);
  }
};

startServer();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});
