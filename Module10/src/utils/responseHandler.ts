import type { Response } from "express";

export interface ResponseOptions {
  statusCode: number;
  success: boolean;
  message: string;
  data?: any;
  error?: string | any;
  errors?: string | any;
}

export const sendResponse = (res: Response, options: ResponseOptions) => {
  const { statusCode, success, message, data, error, errors } = options;

  const response: any = {
    success,
    message,
  };

  if (data) {
    response.data = data;
  }

  if (error) {
    response.error = error;
  }

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any,
) => {
  return sendResponse(res, { statusCode, success: true, message, data });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error: string | any,
) => {
  return sendResponse(res, { statusCode, success: false, message, error });
};

export const errorsResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors: string | any,
) => {
  return sendResponse(res, { statusCode, success: false, message, errors });
};
