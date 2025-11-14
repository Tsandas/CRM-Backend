import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis(process.env.REDIS_URL);
await redis.set("test_key", "test_value");
