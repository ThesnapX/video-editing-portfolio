const mongoose = require("mongoose");
require("dotenv").config();

async function testLocalConnection() {
  console.log("Testing local MongoDB connection...");
  console.log("Connection string:", process.env.MONGODB_URI);

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to local MongoDB!");

    // Test creating a collection
    const testSchema = new mongoose.Schema({ test: String });
    const Test = mongoose.model("Test", testSchema);
    await Test.create({ test: "Hello MongoDB" });
    console.log("✅ Successfully wrote to database");

    const count = await Test.countDocuments();
    console.log(`📊 Document count: ${count}`);

    await mongoose.disconnect();
    console.log("✅ Test completed successfully");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.log("\nMake sure MongoDB is running:");
    console.log("1. Open Services (Windows + R, type services.msc)");
    console.log('2. Find "MongoDB Server"');
    console.log("3. Start it if not running");
    console.log('4. Or run "mongod" in terminal');
  }
}

testLocalConnection();
