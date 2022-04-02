import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';
import { Connect, Query } from '../config/mysql';
import IUser from '../interfaces/IUser';

const NAMESPACE = 'AuthController';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Token validated, user authorized");

  return res.status(200).json({
    message: 'Authorized'
  });
}

const loginAuth = async (req: Request, res: Response, next: NextFunction) => {
  let { user_login, user_password } = req.body;
  let query = `SELECT * from tb_user where user_login = '${user_login}'`;

  Connect()
    .then(connection => {
      Query<IUser[]>(connection, query)
        .then(results => {
          bcryptjs.compare(user_password, results[0].user_password, (error, result) => {
            if (error) {
              logging.error(NAMESPACE, error.message, error);
              return res.status(401).json({
                message: error.message,
                error: error
              });
            }
            else if (result) {
              signJWT(results[0], (_error, token) => {
                if (_error) {
                  logging.error(NAMESPACE, _error.message, _error);
                  return res.status(401).json({
                    message: _error.message,
                    error: _error
                  });
                }
                else if (token) {
                  return res.status(200).json({
                    message: 'Authorized',
                    token: token,
                    expiresIn: 43199,
                    token_type: 'Bearer',
                    user: results[0]
                  });
                }
              });
            }
          });
        })
        .catch(error => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(500).json({
            message: error.message,
            error: error
          });
        })
        .finally(() => {
          connection.end();
        })
    })
}

export default {validateToken, loginAuth};