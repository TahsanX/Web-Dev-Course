import type { Response } from 'express';
import type { IApiResponse } from '../types';
export const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    error: data.error,
  });
};