import { Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
import { ICategory } from "../interfaces/ICategory";
import HttpError from "../errors/HttpError";

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
        message: "Internal error while searching for categories.",
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
          message: "Category not found.",
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
        message: "Internal error while searching for category.",
      });
    }
  }

  async createCategory(req: Request, res: Response): Promise<void> {
    const categoryData: ICategory = req.body;

    try {
      await categoryService.categoryRulesValidation(categoryData);

      const createdCategory = await categoryService.createCategory(
        categoryData
      );

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Category created successfully.",
        createdCategory: createdCategory,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({
          code: error.statusCode,
          status: "error",
          message: error.message,
        });
        return;
      }

      console.error("Error creating category.", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal error while creating category.",
      });
    }
  }
}

export const categoryController = new CategoryController();
