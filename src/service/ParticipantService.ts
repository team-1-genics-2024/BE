import redisClient from "../config/redis";
import { EnrollRepository } from "../repository/EnrollRepository";

export class ParticipantService {
  static async getParticipantCount(classId: number) {
    let participants: number = 0;

    const cachedCount = await redisClient.get(`class:${classId}:participants`);

    if (cachedCount) {
      participants = parseInt(cachedCount);
    }
    
    if (!participants) {
      const count = await EnrollRepository.countByClassId(classId);
      await redisClient.set(`class:${classId}:participants`, count);
      participants = count;
    }

    return participants;
  }

  static async incrementParticipantCount(classId: number) {
    const key = `class:${classId}:participants`;
    return await redisClient.incr(key);
  }
}