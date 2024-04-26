import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.error(error.stack);
  res.status(500).send({ message: "Something went wrong!" });
};

export default errorHandler;
