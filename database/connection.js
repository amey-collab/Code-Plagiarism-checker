const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = 'mongodb://127.0.0.1:27017/codeplagiarism';
  const uri = primaryUri || fallbackUri;

  const connect = async (connectionString) => {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected to ${connectionString}`);
  };

  try {
    await connect(uri);
  } catch (error) {
    console.error(`MongoDB connection failed for ${uri}:`, error.message);
    if (primaryUri && primaryUri !== fallbackUri) {
      console.warn('Attempting fallback to local MongoDB...');
      try {
        await connect(fallbackUri);
      } catch (fallbackError) {
        console.error('Fallback MongoDB connection failed:', fallbackError.message);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
