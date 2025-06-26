import express, { Express } from "express";
import dotenv from "dotenv";
import router from "../routes/routes";

dotenv.config();

class Server {
  private server: Express;
  private port: number | string;

  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3000;
    this.routes();
  }

  private routes(): void {
    this.server.use(express.json());
    this.server.use("/api", router);
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.log("Server Running on port", this.port);
    });
  }
}

const server = new Server();
server.start();
