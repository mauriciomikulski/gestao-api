import { Request, Response, NextFunction } from "express";
import {LOG} from '../config/constants/constants'
import logging from "../config/logging";
import bcryptjs from "bcryptjs";
import { Connect, Query } from "../config/mysql";
import IUser from "../interfaces/IUser";
import IMysqlResult from "../interfaces/IMysql";

const NAMESPACE = "Users";

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  logging.log(NAMESPACE, "Getting all users", LOG.INFO);

  let query = 'SELECT * FROM tb_user'

  Connect()
    .then(connection => {
      Query<IUser[]>(connection, query)
        .then(results => {
          return res.status(200).json({
            results,
            count: results.length
          })
        })
        .catch(error => {
          logging.log(NAMESPACE, error.message, LOG.ERROR, error);

          return res.status(500).json({
            message: error.message,
            error: error
          });
        })
        .finally(() => {
          connection.end();
        })
    })
    .catch(error => {
      logging.log(NAMESPACE, error.message, LOG.ERROR, error);

      return res.status(500).json({
        message: error.message,
        error: error
      });
    });
}

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  logging.log(NAMESPACE, "Getting user by id", LOG.INFO);

  let query = `SELECT * from tb_user where id = '${req.params.userId}'`;

  Connect()
    .then(connection => {
      Query(connection, query)
        .then(results => {
          return res.status(200).json({
            results
          })
        })
        .catch(error => {
          logging.log(NAMESPACE, error.message, LOG.ERROR, error);

          res.status(500).json({
            message: error.message,
            error: error
          })
        })
        .finally(() => {
          connection.end();
        })
    })
    .catch(error => {
      logging.log(NAMESPACE, error.message, LOG.ERROR, error);

      return res.status(500).json({
        message: error.message,
        error: error
      });
    });
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
  logging.log(NAMESPACE, "Creating user", LOG.INFO);

  let { user_nome, user_login, user_password, user_tipo } = req.body;
  bcryptjs.hash(user_password, 10, (hasherror, hash) => {
    if (hasherror) {
      logging.log(NAMESPACE, hasherror.message, LOG.ERROR, hasherror);
      return res.status(500).json({
        message: hasherror.message,
        error: hasherror
      });
    }

    let query = `INSERT INTO tb_user (user_nome, user_login, user_password, user_tipo) VALUES ('${user_nome}', '${user_login}', '${hash}', '${user_tipo}')`;

    Connect()
      .then(connection => {
        Query<IMysqlResult>(connection, query)
          .then(result => {
            logging.log(NAMESPACE, "User created", LOG.INFO);
            return res.status(200).json({
              result
            })
          })
          .catch(error => {
            logging.log(NAMESPACE, error.message, LOG.ERROR, error);

            return res.status(500).json({
              message: error.message,
              error: error
            });
          })
          .finally(() => {
            connection.end();
          })
      })
      .catch(error => {
        logging.log(NAMESPACE, error.message, LOG.ERROR, error);

        return res.status(500).json({
          message: error.message,
          error: error
        });
      });
  });
}



export default { getAllUsers, getUserById, createUser };