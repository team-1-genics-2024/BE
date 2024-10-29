import {
  GetClassByIdRequest,
  GetClassByIdResponse,
  SearchClassRequest,
  SearchClassResponse,
  GetAllClassResponse
  } from '../model/ClassModel';
import { ClassRepository } from '../repository/ClassRepository';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { Validation } from '../utils/validation';
import { ClassValidation } from '../validation/ClassValidation';

export class ClassService {
  static async getClass (request: GetClassByIdRequest): Promise<GetClassByIdResponse> {
    const classData = await ClassRepository.findById(request.id);

    if (!classData) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
    }

    return {
      class: classData
    };
  }

  static async searchClass (request: SearchClassRequest): Promise<SearchClassResponse> {
    Validation.validation(ClassValidation.SEARCH, request);

    const classes = await ClassRepository.searchByKeyword(request.keyword);

    if (!classes.length) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
    }

    return {
      classes
    };
  }

  static async getAllClass (): Promise<GetAllClassResponse> {
    const classes = await ClassRepository.findAll();

    if (!classes.length) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Class not found');
    }

    return {
      classes
    };
  }
}