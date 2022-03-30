import config from "../../source/config/config";
import express, { Application, Express, Request, Response } from "express";

export abstract class CommonRoutes {
  app: Application = express();
  name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  getName() {
    return this.name;
  }

  abstract configureRoutes(): Application;
}