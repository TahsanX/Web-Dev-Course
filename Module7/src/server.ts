import app from "./app";
import dotenv from "dotenv" 
import { initDB } from "./db";
dotenv.config()
const main = async ()=>{
  await initDB()
  app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
}
main()