/* External Dependecies */
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";
import { LoggerService } from "../utils/logger";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const logger = new LoggerService();

  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ status: "error", message: message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
