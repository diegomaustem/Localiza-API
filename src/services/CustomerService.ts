import { ICustomer } from "../interfaces/ICustomer";
import { customerRepository } from "../repositories/CustomerRepository";
import { genericRepository } from "../repositories/GenericRepository";
import { passwordManager } from "../utils/PasswordManager";
import HttpError from "../errors/HttpError";

class CustomerService {
  async getCustomers(): Promise<ICustomer[]> {
    try {
      return await customerRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve customers.", error);
      throw error;
    }
  }

  async getCustomer(customerId: string): Promise<ICustomer | null> {
    try {
      return await customerRepository.findOne(customerId);
    } catch (error) {
      console.error("Failed to retrieve customer.", error);
      throw error;
    }
  }

  async createCustomer(custumerData: ICustomer): Promise<ICustomer> {
    const newCustomer: ICustomer = {
      ...custumerData,
      password: await passwordManager.hashPassword(custumerData.password),
    };

    try {
      return await customerRepository.create(newCustomer);
    } catch (error) {
      console.error("Failed to create customer.", error);
      throw error;
    }
  }

  async updateCustomer(
    customerId: string,
    custumerData: ICustomer
  ): Promise<ICustomer> {
    const updatedData: ICustomer = {
      ...custumerData,
      password: await passwordManager.hashPassword(custumerData.password),
    };

    try {
      return await customerRepository.update(customerId, updatedData);
    } catch (error) {
      console.error("Failed to update customer.", error);
      throw error;
    }
  }

  async deleteCustomer(customerId: string): Promise<ICustomer> {
    try {
      return await customerRepository.delete(customerId);
    } catch (error) {
      console.error("Failed to delete customer.", error);
      throw error;
    }
  }

  async customerRulesValidation(
    customerData?: ICustomer,
    customerId?: string
  ): Promise<void> {
    if (customerId) {
      const hasReservation = await genericRepository.generateQuery(
        "reserves",
        "customers_id",
        customerId
      );

      if (hasReservation) {
        throw new HttpError(
          "Este cliente possui reserva(s) e não pode ser removido.",
          409
        );
      }
      return;
    }

    if (!customerData) {
      throw new HttpError("Dados do cliente não foram fornecidos.", 400);
    }

    const { cpf, email, cnh_code, nationalities_id, honors_id } = customerData;

    const [
      existingCpf,
      existingEmail,
      existingCnh,
      nationalityExists,
      honorExists,
    ] = await Promise.all([
      genericRepository.generateQuery("customers", "cpf", cpf),
      genericRepository.generateQuery("customers", "email", email),
      genericRepository.generateQuery("customers", "cnh_code", cnh_code),
      genericRepository.generateQuery("nationalities", "id", nationalities_id),
      genericRepository.generateQuery("honors", "id", honors_id),
    ]);

    if (existingCpf) {
      throw new HttpError("O CPF fornecido já está cadastrado.", 409);
    }

    if (existingEmail) {
      throw new HttpError("O e-mail fornecido já está registrado.", 409);
    }

    if (existingCnh) {
      throw new HttpError("A CNH fornecida já está registrada.", 409);
    }

    if (!nationalityExists) {
      throw new HttpError(
        "Nacionalidade não encontrada. Insira uma válida.",
        404
      );
    }

    if (!honorExists) {
      throw new HttpError("Honra não encontrada. Insira uma válida.", 404);
    }
  }
}

export const customerService = new CustomerService();
