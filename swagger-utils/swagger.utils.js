const fs = require('fs');

function walkParameters(swaggerJson, callback) {
  const paths = Object.entries(swaggerJson.paths);
  paths.forEach(([path, pathObject]) => {
    const methods = Object.entries(pathObject);
    methods.forEach(([method, methodObject]) => {
      const parameters = methodObject.parameters || [];
      callback(path, method, parameters);
    });
  });
}

function readSwaggerJsonFromStdin() {
  const swaggerJsonString = readStdin();
  return JSON.parse(swaggerJsonString);
}

function readStdin() {
  return fs.readFileSync(0, 'utf-8');
}

module.exports = {
  walkParameters,
  readSwaggerJsonFromStdin,
};
