import * as bycrypt from "bcrypt";

class PasswordManager {
  async hashPassword(password: string): Promise<string> {
    return await bycrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bycrypt.compare(password, hash);
  }
}

export const passwordManager = new PasswordManager();
