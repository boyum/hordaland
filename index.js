const express = require('express');
const http = require('http');

const app = express();

app.enable('trust proxy');

app.get('/', (req, res) => {
  const ip = req.ip;
  const options = {
    host: 'ip-api.com',
    port: '80',
    path: '/' + ip,
    method: 'GET',
  };

  var regionName;

  const ipRequest = http.request(options, (response) => {
    console.log('res', response);
    res.send(response);
  });

  ipRequest.end();

  // var xhr = new XMLHttpRequest();
  // xhr.addEventListener('load', reqListener);
  // xhr.open('GET', `http://ip-api.com/json/${ip}`);
  // xhr.send();

  // function reqListener() {
  //   regionName = JSON.parse(this.responseText).regionName;
  //   res.send(regionName);
  // }
  // http://stackoverflow.com/questions/19074727/how-can-i-make-ajax-requests-using-the-express-framework
});

app.listen(3000, () => {
  console.log('Server is up');
});

function getRegionName(ip) {

}