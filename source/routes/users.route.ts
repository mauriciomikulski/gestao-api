import { CommonRoutes } from "./common.routes"
import controller from "../controllers/Users.controller"
import express, { Application } from "express"

export class UsersRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.route('/api/users')
      .get(controller.getAllUsers);
    this.app.route('/api/users/:userId')
      .get(controller.getUserById);
    this.app.route('/api/users')
      .post(controller.createUser);
    return this.app;
  }
}