const config = {
  mongoURI: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExp: 12,
  jwtName: "em-jwt",
  PORT: process.env.PORT || "",
};

export default config;
