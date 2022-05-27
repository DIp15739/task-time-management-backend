import { Request, Response } from "express";

export function welcome(req: Request, res: Response) {
  return res.status(200).send("Welcome");
}
