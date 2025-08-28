import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "../routes/index";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

class Server {
  private server: Express;
  private port: number | string;

  constructor() {
    this.server = express();
    this.port = Number(process.env.PORT) || 3000;
    this.middlewares();
    this.routes();
    this.handleNotFound();
  }

  private middlewares(): void {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use("/api", router);
  }

  private handleNotFound(): void {
    this.server.use((req: Request, res: Response) => {
      res.status(404).json({
        error: "error",
        message: "Route not found. Please check the path and try again.",
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
