import { Request, Response } from "express";
import HttpError from "../errors/HttpError";
import { ICategoryService } from "../interfaces/Category/ICategoryService";
export class CategoryController {
  constructor(private readonly service: ICategoryService) {}

  listCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.service.listCategories();
      res.status(200).json({ data: { categories: categories } });
    } catch (error) {
      console.error("Error getting categories.", error);
      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error fetching categories.",
      });
    }
  };

  listCategory = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      const category = await this.service.listCategory(id);
      res.status(200).json({ data: { category: category } });
    } catch (error) {
      console.error("Error getting category.", error);

      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal error fetching category.",
      });
    }
  };
}
