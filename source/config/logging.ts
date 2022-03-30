const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
  } else {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
  } else {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
  } else {
    console.error(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
  } else {
    console.debug(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

const getTimeStamp = () => {
  return new Date().toISOString();
};

export default {
  info,
  warn,
  error,
  debug
}
