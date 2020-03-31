const { readSwaggerJsonFromStdin, walkParameters } = require('./swagger.utils');

validateSwaggerParams();

function validateSwaggerParams() {
  const swaggerJson = readSwaggerJsonFromStdin();
  walkParameters(swaggerJson, validateParameters);
}

function validateParameters(path, method, parameters) {
  const parameterNames = parameters.map(parameter => parameter.name);
  const uniqueParameters = new Set(parameterNames);
  if (uniqueParameters.size !== parameters.length) {
    const duplicatedParameters = getDuplicates(parameterNames);
    console.error(`There are duplicated parameters in "paths.'${path}'.${method}.parameters": `, duplicatedParameters);
    process.exit(1);
  }
}

function getDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) !== index);
}
