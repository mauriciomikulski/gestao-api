import { CommonRoutes } from "./common.routes";
import controller from "../controllers/Auth.controller";
import express, { Application } from "express";
import extractJwt from "../middlewares/extractJWT";
import { ROUTES } from "../config/constants/routes.constants";

export class AuthRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {
    this.app.route(ROUTES.auth.validate)
      .get(extractJwt, controller.validateToken);
    this.app.route(ROUTES.auth.login)
      .post(controller.loginAuth);    
    return this.app;
  }
}