import app from "./app";
import dotenv from "dotenv";
import { initDB } from "./db";
dotenv.config();
const main = async () => {
  try {
    await initDB();
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  } catch (error: any) {
    console.error(
      "❌ Critical: Server failed to start due to DB issue!",
      error,
    );
    process.exit(1);
  }
};
main();
