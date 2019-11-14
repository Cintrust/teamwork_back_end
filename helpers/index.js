exports.promisify = (callback) => {
  if (callback) {
    return {
      callback,
      result: undefined,
    };
  }
  let rej;
  let res;
  const cb = (err, client) => {
    if (err) {
      rej(err);
    } else {
      res(client);
    }
  };
  const result = new Promise(((resolve, reject) => {
    res = resolve;
    rej = reject;
  }));
  return {
    callback: cb,
    result,
  };
};
