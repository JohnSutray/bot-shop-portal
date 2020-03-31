const { readSwaggerJsonFromStdin, walkParameters } = require('./swagger.utils');

sortSwaggerParams();

function sortSwaggerParams() {
  const swaggerJson = readSwaggerJsonFromStdin();
  const sortedSwaggerJson = sortParameters(swaggerJson);
  const sortedSwaggerJsonString = JSON.stringify(sortedSwaggerJson, null, 2);
  console.log(sortedSwaggerJsonString);
}

function sortParameters(swaggerJson) {
  walkParameters(swaggerJson, (path, method, parameters) => {
    parameters.sort(compareParametersByName);
  });
  return swaggerJson;
}

function compareParametersByName(a, b) {
  return a.name.localeCompare(b.name);
}
