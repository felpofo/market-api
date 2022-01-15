import { getCustomRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;
  const usersRepo = getCustomRepository(UsersRepositories);
  const user = await usersRepo.findOne(user_id);

  if (user?.admin) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
}
