const fs = require("fs");

const writeCprogram = (fname, data) => {
  fs.writeFileSync(fname + ".c", data);
  console.log(`gcc -o ${fname} ${fname}.c ; if ($?) { .\\${fname}.exe }`);
};

module.exports = { writeCprogram };
