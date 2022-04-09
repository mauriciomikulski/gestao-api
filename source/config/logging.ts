const log = (namespace: string, message: string, tipo: any, object = {}) => {
  object && console.log(`[${getTimeStamp()}] [${tipo}] [${namespace}] ${message}`, object);
};

const getTimeStamp = () => {
  return new Date().toISOString();
};

export default { log };
