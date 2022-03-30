import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Users";

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Getting all users");

  let query = 'SELECT * FROM tb_user'

  Connect()
    .then(connection => {
      Query(connection, query)
        .then(results => {
          return res.status(200).json({
            results
          })
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
    .catch(error => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(500).json({
        message: error.message,
        error: error
      });
    });
}

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Getting user by id");

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
          logging.error(NAMESPACE, error.message, error);

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
      logging.error(NAMESPACE, error.message, error);

      return res.status(500).json({
        message: error.message,
        error: error
      });
    });
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Creating user");

  let { user_nome, user_login, user_password, user_tipo } = req.body;

  let query = `INSERT INTO tb_user (user_nome, user_login, user_password, user_tipo) VALUES ('${user_nome}', '${user_login}', '${user_password}', '${user_tipo}')`;

  Connect()
    .then(connection => {
      Query(connection, query)
        .then(result => {
          return res.status(200).json({
            result
          })
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


export default { getAllUsers, getUserById, createUser };