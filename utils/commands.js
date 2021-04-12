const png2pos = require("./png2pos");
const arguments = process.argv.slice(2);
const command = arguments[0];

switch (command) {
    case 'png2pos':
        let inputFilename = arguments[1];
        let outputFilename = arguments[2];
        png2pos(inputFilename, outputFilename);
        break;
    default:
        console.log("Nothing to run");
        break;
}