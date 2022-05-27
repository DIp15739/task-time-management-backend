import express, { Application } from "express";
import morgan from "morgan";

// Routes
import appRoutes from "./routes/appRoutes";
import userRoutes from "./routes/userRoutes";
import userInfoRoutes from "./routes/userInfoRoutes";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
config({
  path: path.resolve(__dirname, "../.env"),
});

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middleWares();
    this.routes();
  }

  settings() {
    this.app.use(express.static(path.join(__dirname, "views/assets")));
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("port", this.port || process.env.PORT || 3000);
    this.app.use(cors());
  }

  middleWares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(appRoutes);
    this.app.use("/user", userRoutes);
    this.app.use("/userInfo", userInfoRoutes);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log(`server started at http://localhost:${this.app.get("port")}`);
  }
}
