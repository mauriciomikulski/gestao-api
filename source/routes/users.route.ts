import { CommonRoutes } from "./common.routes"
import controller from "../controllers/Users.controller"
import express, { Application } from "express"
import extractJwt from "../middlewares/extractJWT"

export class UsersRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.route('/api/users')
      .get(extractJwt, controller.getAllUsers);
    this.app.route('/api/users/:userId')
      .get(extractJwt, controller.getUserById);
    this.app.route('/api/users')
      .post(extractJwt, controller.createUser);
    return this.app;
  }
}