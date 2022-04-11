import jwt from "jsonwebtoken";
import config from "../config/config";
import { LOG } from "../config/constants/log.constants";
import logging from "../config/logging";
import IUser from "../interfaces/IUser";

const NAMESPACE = "Auth";

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
  var timeSinchEpoch = new Date().getTime();
  var expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  logging.log(NAMESPACE, `Attempting to sign token for ${user._id}`, LOG.INFO);

  try {
    jwt.sign(
      {
        username: user._id,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      })
  } catch (error: any) {
    logging.log(NAMESPACE, error.message, LOG.ERROR, error);
    callback(error, null);
  }
};

export default signJWT;