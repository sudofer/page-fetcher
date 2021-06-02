const request = require("request");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fetcher = (url, path) => {
  request(url, (error, response, body) => {
    console.log("error", error);

    console.log("statusCode:", response && response.statusCode);

    try {
      if (fs.existsSync(path)) {
        rl.question(
          `Do you want to overwrite ${path}? please type 'y'`,
          (answer) => {
            if (answer === "y") {
              fs.writeFile(path, body, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(
                  `Download Complete ${body.length} bytes to ${path}`
                );
                process.exit();
              });
            } else process.exit();
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  });
};

const path = "./fill1.txt";
const url = "http://www.example.edu";

fetcher(url, path);
