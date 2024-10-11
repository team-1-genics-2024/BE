import { createClient } from 'redis';
import { redisLogger } from './logConfig';  // Menggunakan logger yang sama dengan prisma untuk konsistensi

declare global {
  var _redisClient: ReturnType<typeof createClient> | undefined;
}

// Membuat client Redis hanya jika belum ada
if (!global._redisClient) {
  global._redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
    password: process.env.REDIS_PASSWORD || undefined,
    database: Number(process.env.REDIS_DB) || 0,
  });
}

// Menambahkan event logging ke Redis mirip seperti Prisma
const redisClientWithEvents = global._redisClient!;

redisClientWithEvents.on('connect', () => {
  redisLogger.info('Redis connected');
});

redisClientWithEvents.on('ready', () => {
  redisLogger.info('Redis is ready');
});

redisClientWithEvents.on('error', (err) => {
  redisLogger.error('Redis error: ', err);
});

redisClientWithEvents.on('reconnecting', () => {
  redisLogger.warn('Redis is reconnecting');
});

redisClientWithEvents.on('end', () => {
  redisLogger.info('Redis connection closed');
});

// Fungsi untuk memastikan Redis terhubung
async function connectRedis() {
  if (!redisClientWithEvents.isOpen) {
    await redisClientWithEvents.connect();
  }
}

connectRedis().catch((err) => redisLogger.error('Error connecting to Redis:', err));

const redisClient = redisClientWithEvents;

export default redisClient;
