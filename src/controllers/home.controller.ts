import { Request, Response } from 'express';

export const homeContorller = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'ok',
  });
};
