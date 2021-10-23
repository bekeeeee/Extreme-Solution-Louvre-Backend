import express, { Request, Response, NextFunction } from "express";

import { InversifyExpressServer } from "inversify-express-utils";

import { DBContext } from "@data/db.context";
import {
  Application,
  IAbstractApplicationOptions,
  MorganMode,
} from "@web/lib/abstract-application";
import { Container } from "inversify";

import "@web/controllers/users.controller";
import { UsersRepository } from "@data/users.repository";
import { UsersService } from "@logic/services/users.service";

export class App extends Application {
  constructor() {
    super({
      containerOpts: {
        defaultScope: "Singleton",
      },
      morgan: {
        mode: MorganMode.DEV,
      },
    });
  }
  private server: any;
  configureServices(container: Container): void {
    container.bind(DBContext).toSelf();
    container.bind(UsersRepository).toSelf();
    container.bind(UsersService).toSelf();
  }

  async setup(options: IAbstractApplicationOptions) {
    const _db = this.container.get(DBContext);

    await _db.connect();

    this.server = new InversifyExpressServer(this.container);

    this.server.setErrorConfig((app: any) => {
      app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        next();
      });
    });

    this.server.setConfig((app: any) => {
      app.use(express.json());
    });

    const app = this.server.build();

    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  }

  get getserver() {
    return this.server;
  }
}

new App();
