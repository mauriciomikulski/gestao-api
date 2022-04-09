import { CommonRoutes } from "./common.routes"
import controller from "../controllers/Users.controller"
import express, { Application } from "express"
import extractJwt from "../middlewares/extractJWT"
import { ROUTES } from "../config/constants/routes.constants";

export class UsersRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.route(ROUTES.user.getAll)
      .get(extractJwt, controller.getAllUsers);
    this.app.route(ROUTES.user.getById)
      .get(extractJwt, controller.getUserById);
    this.app.route(ROUTES.user.create)
      .post(extractJwt, controller.createUser);
    this.app.route(ROUTES.user.update)
      .put(extractJwt, controller.updateUser);
    this.app.route(ROUTES.user.delete)
      .delete(extractJwt, controller.deleteUser);
    return this.app;
  }
}