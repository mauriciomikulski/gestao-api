import express, { Application } from "express";
import bodyParser from "body-parser"
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../../public/swagger.json";
import config from "../../source/config/config";
import logging from "../../source/config/logging";
import { CommonRoutes } from "../../source/routes/common.routes";
import { UsersRoutes } from "../../source/routes/users.route";
import debug from "debug";
import { debuglog } from "util";
import { AuthRoutes } from "../../source/routes/auth.routes";