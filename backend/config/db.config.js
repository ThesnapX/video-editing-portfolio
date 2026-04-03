const getMongoURI = () => {
  // For production (Render/Vercel)
  if (process.env.NODE_ENV === "production") {
    return process.env.MONGODB_URI_PROD || process.env.MONGODB_URI;
  }

  // For local development - check if Atlas works, fallback to local
  const useAtlas = process.env.USE_ATLAS === "true";

  if (useAtlas) {
    return process.env.MONGODB_URI_ATLAS;
  }

  return "mongodb://localhost:27017/video-editor-portfolio";
};

module.exports = { getMongoURI };
