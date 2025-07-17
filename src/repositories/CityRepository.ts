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
}

export const cityRepository = new CityRepository();
