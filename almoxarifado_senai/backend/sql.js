import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

export const sql = postgres(postgres.env.DATABASE_URL, {
    ssl:'require'
});