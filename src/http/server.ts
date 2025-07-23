import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "../routes/routes";
import cors from "cors";

dotenv.config();

class Server {
  private server: Express;
  private port: number | string;

  constructor() {
    this.server = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routes();
    this.handleNotFound();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use("/api", router);
  }

  private handleNotFound(): void {
    this.server.use((req: Request, res: Response) => {
      res.status(404).json({
        code: 404,
        error: "error",
        message: "Rota não encontrada. Verifique o caminho e tente novamente.",
      });
    });
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.log("Server Running on port", this.port);
    });
  }
}

const server = new Server();
server.start();
