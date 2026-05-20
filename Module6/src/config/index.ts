import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "src", ".env") });

console.log("Check PORT:", process.env.PORT);

const config = {
    port: Number(process.env.PORT) || 3200,
};

export default config;