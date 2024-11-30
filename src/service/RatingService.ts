import {
  CreateRatingRequest,
  CreateRatingResponse,
} from './../model/RatingModel';
import { RatingRepository } from './../repository/RatingRepository';
import { ClassRepository } from './../repository/ClassRepository';
import { UserRepository } from './../repository/UserRepository';
import { EnrollRepository } from '../repository/EnrollRepository';
import database from './../config/database';
import { ResponseError } from './../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { Validation } from './../utils/validation';
import { RatingValidation } from './../validation/RatingValidation';
import { calculateRating } from './../utils/calculateRating';

export class RatingService {
  static async createRating(request: CreateRatingRequest): Promise<CreateRatingResponse> {
    const data = Validation.validation(RatingValidation.CREATE, request);

    const user = await UserRepository.findById(data.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const classData = await ClassRepository.findById(data.classId);

    if (!classData) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
    }

    const enrollExists = await EnrollRepository.findByUserIdAndClassId(data.userId, data.classId);

    if (!enrollExists) {
      throw new ResponseError(StatusCodes.FORBIDDEN, 'You are not enrolled in this class');
    }

    const db = database;

    try {
      const result = await db.$transaction(async () => {
        const ratingExists = await RatingRepository.findByUserIdAndClassId(data.userId, data.classId);

        let newRating;

        if (ratingExists) {
          newRating = await RatingRepository.updateById(ratingExists.id, data.rating);
        } else {
          newRating = await RatingRepository.create(data.userId, data.classId, data.rating);
        }

        const ratings = await RatingRepository.findByClassId(data.classId);

        const averageRating = calculateRating(ratings);

        await ClassRepository.updateRating(data.classId, averageRating);

        return newRating;
      });

      return {
        rating: result,
      }
      
    } catch (error) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
}
