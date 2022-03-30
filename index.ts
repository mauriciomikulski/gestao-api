import express, { Application } from "express";
import bodyParser from "body-parser"
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import config from "./source/config/config";
import logging from "./source/config/logging";
import { CommonRoutes } from "./source/routes/common.routes";
import { UsersRoutes } from "./source/routes/users.route";
import debug from "debug";
import { debuglog } from "util";

const NAMESPACE = "Server";
const app: Application = express();
const routes: Array<CommonRoutes> = [];

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

/** Log the req and res */
app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
  })
  next();
})

/** Parse the body of the arguments */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Rules of the API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow_Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
})


routes.push(new UsersRoutes(app));

app.get('/', (req, res, next) => {
  const runningMessage = `Server running at http://localhost:${config.server.port}`;
  const error = new Error('You do not have permission to access this page.');
  res.status(200).send(runningMessage);
})

/**app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "public/swagger.json",

    },
  })
); */

app.listen(config.server.port, () => {
  routes.forEach((route: CommonRoutes) => {
    debuglog(`Routes configured for ${route.getName()}`);
  })
})


