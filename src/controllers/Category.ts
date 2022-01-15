import { Request, Response } from "express";
import { category as services } from "../services";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const createCategoryService = new services.CreateCategoryService();
    const category = await createCategoryService.execute(name);

    return res.status(200).json(category);
  }
}
