const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

const downloader = (targetUrl) => {
  request(targetUrl, (error, response, body) => {
    if (error) {
      console.log(`The following error has occured: `, error);
    };
    if (response.statusCode !== 200) {
      console.log(`Something went wrong; Status code: ${response.statusCode}`);
    };
    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.log(`Bad path; please try again. Error details:  ${error}`);
      } else {
        const stats = fs.statSync(filePath);
        console.log(`Sucessfully downloaded! Saved ${stats.size} bytes to ${filePath}`);
      }
    })
  })
}

downloader(url);
