import {
  GetClassByIdRequest,
  GetClassByIdResponse,
  SearchClassRequest,
  SearchClassResponse,
  GetAllClassResponse,
  } from '../model/ClassModel';
import { ClassRepository } from '../repository/ClassRepository';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { Validation } from '../utils/validation';
import { ClassValidation } from '../validation/ClassValidation';
import { ParticipantService } from './ParticipantService';

export class ClassService {
  static async getClass (request: GetClassByIdRequest): Promise<GetClassByIdResponse> {
    const rawClassData = await ClassRepository.findById(request.id);

    if (!rawClassData) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
    }

    const totalTopics = rawClassData._count.topics;
    const totalSubtopics = rawClassData.topics.reduce((acc, topic) => acc + topic._count.subtopics, 0);
    const totalParticipants = await ParticipantService.getParticipantCount(request.id);

    const classData = {
      id: rawClassData.id,
      name: rawClassData.name,
      description: rawClassData.description,
      imageUrl: rawClassData.imageUrl,
      totalTopics,
      totalSubtopics,
      totalParticipants,
      rating: parseFloat(rawClassData.rating.toFixed(2)),
      createdAt: rawClassData.createdAt,
      updatedAt: rawClassData.updatedAt
    };

    return {
      class: classData
    }
  }

  static async searchClass (request: SearchClassRequest): Promise<SearchClassResponse> {
    Validation.validation(ClassValidation.SEARCH, request);

    const rawClasses = await ClassRepository.searchByKeyword(request.keyword);

    if (!rawClasses.length) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
    }

    const classes = await Promise.all(rawClasses.map(async rawClassData => {
      const totalTopics = rawClassData._count.topics;
      const totalSubtopics = rawClassData.topics.reduce((acc, topic) => acc + topic._count.subtopics, 0);
      const totalParticipants = await ParticipantService.getParticipantCount(rawClassData.id);

      return {
        id: rawClassData.id,
        name: rawClassData.name,
        description: rawClassData.description,
        imageUrl: rawClassData.imageUrl,
        totalTopics,
        totalSubtopics,
        totalParticipants,
        rating: parseFloat(rawClassData.rating.toFixed(2)),
        createdAt: rawClassData.createdAt,
        updatedAt: rawClassData.updatedAt
      };
    }));

    return {
      classes
    };
  }

  static async getAllClass (): Promise<GetAllClassResponse> {
    const rawClasses = await ClassRepository.findAll();

    if (!rawClasses.length) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
    }

    const classes = await Promise.all(rawClasses.map(async rawClassData => {
      const totalTopics = rawClassData._count.topics;
      const totalSubtopics = rawClassData.topics.reduce((acc, topic) => acc + topic._count.subtopics, 0);
      const totalParticipants = await ParticipantService.getParticipantCount(rawClassData.id);

      return {
        id: rawClassData.id,
        name: rawClassData.name,
        description: rawClassData.description,
        imageUrl: rawClassData.imageUrl,
        totalTopics,
        totalSubtopics,
        totalParticipants,
        rating: parseFloat(rawClassData.rating.toFixed(2)),
        createdAt: rawClassData.createdAt,
        updatedAt: rawClassData.updatedAt
      };
    }));

    return {
      classes
    };
  }
}