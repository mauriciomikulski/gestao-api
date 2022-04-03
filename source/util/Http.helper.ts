import { Response } from "express";

export const ok = (res: Response, data: any) => {
  return res.status(200).json({
    data
  });
}

export const error = (res: Response, error: any) => {
  return res.status(500).json({
    error
  });
}

export const dennied = (res: Response): Response => {
  const error = new Error('You do not have permission to access this page.');
  return res.status(401).send(error);
}
