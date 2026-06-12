import dotenv from "dotenv";
import app from "./app.js";
import conntectDB from "./db/index.js";

dotenv.config();

const port = process.env.PORT || 3000;

conntectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port=${port} `);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });
