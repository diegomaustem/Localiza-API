import { IPrivilege } from "../interfaces/Privilege/IPrivilege";
import { Request, Response } from "express";
import { IPrivilegeRepository } from "../interfaces/Privilege/IPrivilegeRepository";
import HttpError from "../errors/HttpError";

export class ServicePrivilege {
  constructor(private repository: IPrivilegeRepository) {}

  async listPrivileges(): Promise<IPrivilege[]> {
    try {
      return await this.repository.findMany();
    } catch (error) {
      console.error("Error retrieving privileges:", error);
      throw error;
    }
  }

  async listPrivilege(id: string): Promise<IPrivilege | null> {
    try {
      const privilege = await this.repository.findOne(id);
      if (!privilege) {
        throw new HttpError("RESOURCE_NOT_FOUND", "Privilege not found.", 404);
      }
      return privilege;
    } catch (error) {
      console.error("[Service] - Error retrieving privilege by ID:", error);
      throw error;
    }
  }
}
