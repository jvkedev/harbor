import app from "./app.js";
import { connectDB } from "./infrastructure/database/db.js";
import env from "./config/config.js";

const PORT = env.port;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
