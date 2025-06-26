import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

class Server {
  private server: Express;
  private port: number | string;

  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3000;
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
