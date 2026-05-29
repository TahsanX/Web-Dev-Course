import app from "./app"
import { config } from "./config/index"
import { initDB } from "./DB"
const main = async () => {
  try {
    await initDB();
    app.listen(config.port, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  } catch (error: any) {
    console.error(
      "Critical: Server failed to start due to DB issue!",
      error,
    );
    process.exit(1);
  }
};
main();