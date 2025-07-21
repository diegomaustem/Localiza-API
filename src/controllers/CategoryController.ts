import { Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
class CategoryController {
  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.getCategories();
      res
        .status(200)
        .json({ code: 200, status: "success", categories: categories });
    } catch (error) {
      console.error("Error getting categories.", error);

      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar por categorias.",
      });
    }
  }

  async getCategory(req: Request, res: Response): Promise<void> {
    const categoryId: string = req.params.id;

    try {
      const category = await categoryService.getCategory(categoryId);
      if (category === null) {
        res.status(404).json({
          code: 404,
          status: "error",
          message: "Categoria não encontrada.",
        });
        return;
      }

      res.status(200).json({
        code: 200,
        status: "success",
        category: category,
      });
    } catch (error) {
      console.error("Error getting category.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno ao buscar por categoria.",
      });
    }
  }
}

export const categoryController = new CategoryController();
