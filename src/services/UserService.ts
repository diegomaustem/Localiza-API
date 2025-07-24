import HttpError from "../errors/HttpError";
import { IUser } from "../interfaces/IUser";
import { IUserLogin } from "../interfaces/IUserLogin";
import { genericRepository } from "../repositories/GenericRepository";
import UserRepository from "../repositories/UserRepository";
import { passwordManager } from "../utils/PasswordManager";
class UserService {
  async getUsers(): Promise<IUser[]> {
    try {
      return await UserRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve users.", error);
      throw error;
    }
  }

  async getUser(userId: string): Promise<IUser | null> {
    try {
      return await UserRepository.findOne(userId);
    } catch (error) {
      console.error("Failed to retrieve user.", error);
      throw error;
    }
  }

  async createUser(user: IUser): Promise<IUser> {
    try {
      const hashedPassword = await passwordManager.hashPassword(user.password);

      const newUser: IUser = {
        ...user,
        password: hashedPassword,
      };

      return await UserRepository.create(newUser);
    } catch (error) {
      console.error("Failed to create user.", error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: IUser): Promise<IUser> {
    try {
      const updatedData: IUser = { ...userData };

      if (userData.password) {
        updatedData.password = await passwordManager.hashPassword(
          userData.password
        );
      }

      return await UserRepository.update(userId, updatedData);
    } catch (error) {
      console.error("Failed to update user.", error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<IUser> {
    try {
      return await UserRepository.delete(userId);
    } catch (error) {
      console.error("Failed to delete user.", error);
      throw error;
    }
  }

  async findUserForLogin(dataUserLogin: IUserLogin): Promise<IUser> {
    const { email } = dataUserLogin;
    try {
      const foundUser = await UserRepository.findUserLogin(email);
      if (!foundUser) {
        throw new HttpError("Usuário não encontrado em nossos registros.", 404);
      }

      return foundUser;
    } catch (error) {
      console.error("Failed to find user for login.", error);
      throw error;
    }
  }

  async userRulesValidation(userData: IUser, userId?: string): Promise<void> {
    const { status_users_id, privileges_id, email } = userData;

    const [hasStatusUser, hasPrivilege, hasEmail] = await Promise.all([
      status_users_id
        ? genericRepository.generateQuery("status_users", "id", status_users_id)
        : Promise.resolve(false),
      privileges_id
        ? genericRepository.generateQuery("privileges", "id", privileges_id)
        : Promise.resolve(false),
      email
        ? genericRepository.generateQuery("users", "email", email)
        : Promise.resolve(false),
    ]);

    if (status_users_id && !hasStatusUser) {
      throw new HttpError(
        "O status_user informado não consta em nossos registros. Tente outro.",
        404
      );
    }
    if (privileges_id && !hasPrivilege) {
      throw new HttpError(
        "O privilégio informado não consta em nossos registros. Tente outro.",
        404
      );
    }
    if (email && hasEmail) {
      throw new HttpError(
        "O e-mail informado já está cadastrado. Tente outro.",
        409
      );
    }
  }
}
export const userService = new UserService();
