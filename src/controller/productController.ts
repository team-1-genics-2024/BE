import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { productService } from "../service/productService";
import { ProductPayment } from "../model/productModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";

export const productController = {
    async payment(req: Request, res : Response){
        try {
            const productReq = req.body as ProductPayment;
            const productRes = await productService.payment(productReq);

            successResponse(res, StatusCodes.OK, "Payment success", productRes);
        } catch (error){
            if (error instanceof Error){
                errorResponse(res, error);
            } else {
                errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
            }
        }
    }
}