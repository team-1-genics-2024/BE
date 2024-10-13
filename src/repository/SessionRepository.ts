import redisClient from "../config/redis";
import { Session } from "../model/AuthModel";

export class SessionRepository {
  static async create(key: string, session: Session): Promise<void> {
    await redisClient.set(key, JSON.stringify(session));
    if (session.expiry) {
      await redisClient.expireAt(key, session.expiry);
    }
  }

  static async findByKey(key: string): Promise<Session | null> {
    const session = await redisClient.get(key);

    if (!session) {
      return null;
    }

    return JSON.parse(session);
  }

  static async updateByKey(key: string): Promise<void> {
    const session = await this.findByKey(key);

    if (!session) {
      return;
    }

    session.lastActive = new Date(Date.now());

    return await this.create(key, session);
  }
  
  static async deleteByKey(key: string): Promise<void> {
    await redisClient.del(key);
  }
}