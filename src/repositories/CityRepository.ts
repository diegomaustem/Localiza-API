import { ICity } from "../interfaces/ICity";
import prisma from "../lib/prisma";

class CityRepository {
  async findMany(): Promise<ICity[]> {
    try {
      return await prisma.cities.findMany();
    } catch (error) {
      console.error("Error fetching cities.", error);
      throw error;
    }
  }

  async findOne(cityId: string): Promise<ICity | null> {
    try {
      return await prisma.cities.findUnique({
        where: { id: cityId },
      });
    } catch (error) {
      console.error("Error fetching city.", error);
      throw error;
    }
  }

  async create(cityData: ICity): Promise<ICity> {
    try {
      return await prisma.cities.create({
        data: cityData,
      });
    } catch (error) {
      console.error("Error creating city.", error);
      throw error;
    }
  }

  async update(cityId: string, cityData: ICity): Promise<ICity> {
    try {
      return await prisma.cities.update({
        where: { id: cityId },
        data: cityData,
      });
    } catch (error) {
      console.error("Error updating nationality.", error);
      throw error;
    }
  }

  async delete(cityId: string): Promise<ICity> {
    try {
      return await prisma.cities.delete({
        where: { id: cityId },
      });
    } catch (error) {
      console.error("Error deleting nationality.", error);
      throw error;
    }
  }
}

export const cityRepository = new CityRepository();
