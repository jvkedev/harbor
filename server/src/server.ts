import app from "./app.js";
import { connectDB } from "./infrastructure/database/db.js";

const PORT = process.env.PORT;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
