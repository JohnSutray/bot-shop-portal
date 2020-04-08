const download = require('node-wget');
const fs = require('fs');
const exec = require('child_process').exec;
const findFilesByGlob = require('glob').sync;
const slash = require('slash');

const generatedDirectory = `./src/app/services/generated`;

const jsonUrl = 'https://api.import-shop.net/swagger/v1/swagger.json';
const generatorUrl = 'https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/3.3.4/openapi-generator-cli-3.3.4.jar';

const jsonFilename = 'swagger.json';
const generatorFilename = 'generator.jar';
const configFilename = 'open-api-config.json';

const pathToJson = `${generatedDirectory}/${jsonFilename}`;
const pathToGenerator = `${generatedDirectory}/${generatorFilename}`;
const allTsFilesPattern = `${generatedDirectory}/**/*.ts`;
const uselessFiles = [
  'api/api.ts',
  'model/models.ts',
  'api.module.ts',
  'git_push.sh',
  'index.ts',
  'README.md',
  '.openapi-generator-ignore',
  '.gitignore',
].map(filename => `${generatedDirectory}/${filename}`);

const generateCommand = `java -jar ${pathToGenerator} generate -g typescript-angular -c ${configFilename} -i ${pathToJson} -o ${generatedDirectory} --skip-validate-spec`;

const logSdt = (stdout, stdError) => {
  console.log(stdout);
  console.warn(stdError);
};

const downloadAsync = (url, filename) => new Promise(resolve =>
  download({ url, dest: filename }, data => {
    console.log(data);
    resolve();
  }),
);

const removeFile = filePath => fs.unlinkSync(slash(filePath));

const executeCommand = command => new Promise(
  (resolve, reject) => exec(command, (error, stdout, stderr) => {
    logSdt(stdout, stderr);
    error ? reject() : resolve();
  }),
);

const generate = async () => {
  const allTsFiles = findFilesByGlob(allTsFilesPattern);
  allTsFiles.forEach(removeFile);

  if (!fs.existsSync(generatedDirectory)) {
    fs.mkdirSync(generatedDirectory);
  }

  if (fs.existsSync(pathToJson)) {
    removeFile(pathToJson);
  }

  await downloadAsync(jsonUrl, pathToJson);

  if (!fs.existsSync(pathToGenerator)) {
    await downloadAsync(generatorUrl, pathToGenerator);
  }

  await executeCommand(generateCommand);

  uselessFiles.forEach(removeFile);
};

generate();


