const mongoose = require("mongoose");

class Database {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) {
      console.log("📊 Using existing database connection");
      return;
    }

    // Get the appropriate URI based on environment
    let mongoURI;
    if (process.env.NODE_ENV === "production") {
      mongoURI = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI;
      console.log("🌍 Production mode - using Atlas MongoDB");
    } else {
      mongoURI = process.env.MONGODB_URI;
      console.log("💻 Development mode - using local MongoDB");
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    try {
      console.log("🔄 Connecting to MongoDB...");
      console.log(`📡 Using URI: ${mongoURI.replace(/harsh123/, "****")}`);

      const conn = await mongoose.connect(mongoURI, options);

      this.isConnected = true;
      console.log(`✅ MongoDB Connected Successfully`);
      console.log(`📊 Database: ${conn.connection.name}`);
      console.log(`🔗 Host: ${conn.connection.host}`);

      // Handle connection events
      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
        this.isConnected = false;
      });

      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
        this.isConnected = false;
      });

      return conn;
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error.message);

      if (process.env.NODE_ENV !== "production") {
        console.log("\n💡 For development, using local MongoDB:");
        console.log(
          "1. Install MongoDB locally: https://www.mongodb.com/try/download/community",
        );
        console.log("2. Start MongoDB service");
        console.log("3. Or set USE_ATLAS=true to test Atlas connection");
      }

      if (process.env.NODE_ENV === "production") {
        console.log(
          "\n⚠️  CRITICAL: Cannot connect to database in production!",
        );
        console.log("Please check your MONGODB_URI_PROD environment variable");
        process.exit(1);
      }

      throw error;
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("📊 Database disconnected");
    }
  }
}

module.exports = new Database();
