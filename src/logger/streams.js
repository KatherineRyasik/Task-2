const fs = require('fs');
const { stdout } = require('process');
const { DIR_LOG, ERROR_LOG, INFO_LOG } = require('../common/config');

const createDir = (pathDir, callback) => {
  fs.mkdir(pathDir, { recursive: true }, err => {
    if (err) {
      return callback(err);
    }
  });
};

const createWritable = pathFile => {
  return fs.createWriteStream(pathFile, {
    encoding: 'utf8',
    flags: 'a'
  });
};

const accessFile = (pathFile, callback) => {
  // eslint-disable-next-line no-bitwise
  fs.access(pathFile, fs.constants.F_OK | fs.constants.W_OK, err => {
    if (err) {
      if (err.code === 'ENOENT') {
        createDir(DIR_LOG, error => {
          if (error) {
            console.error(`The log file: "${pathFile}" does not exist`);

            return callback(err);
          }
        });
      }

      if (err.code !== 'ENOENT') {
        console.error(`The log file: "${pathFile}" is read-only`);

        return callback(err);
      }
    }
    const stream = createWritable(pathFile);
    callback(null, stream);
  });
};

const streamErrLog = message => {
  accessFile(`${DIR_LOG}/${ERROR_LOG}`, (err, stream) => {
    if (err) {
      return;
    }
    stream.write(message);
  });
};

const streamInfoLog = message => {
  accessFile(`${DIR_LOG}/${INFO_LOG}`, (err, stream) => {
    if (err) {
      return;
    }
    stream.write(message);
  });
};

const streamConsLog = message => {
  const stream = stdout;
  stream.write(message);
};

createDir(DIR_LOG, error => {
  if (error) {
    console.error(`Directory "${DIR_LOG}" creation error: ${error.message}`);
    return;
  }
});

module.exports = {
  streamConsLog,
  streamErrLog,
  streamInfoLog
};
