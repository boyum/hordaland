const express = require("express");
const fs = require("fs");
const http = require("http");
const Canvas = require("canvas");
// const text2png = require("text2png");

const app = express();

app.get("/", (req, res) => {
  const options = {
    host: "ip-api.com",
    port: "80",
    path: "/json",
    method: "GET"
  };

  var regionName;

  const ipRequest = http.request(options, response => {
    // Continuously update stream with data
    var body = "";
    response.on("data", function(d) {
      body += d;
    });
    response.on("end", function() {
      // Data reception is done, do whatever with it!
      var parsed = JSON.parse(body);

      const img = createImage(parsed.regionName);

      res.type('png');
      res.send(createImage(parsed.regionName));
      // res.send(
      //   `<!doctype html>\n<html>\n<head>\n<title>${parsed.regionName}</title>\n</head>\n<body>\n<img src="${createImage(parsed.regionName)}" alt="${parsed.regionName}" />\n</body>\n</html>`
      // );
    });
  });

  ipRequest.end();
  // http://stackoverflow.com/questions/19074727/how-can-i-make-ajax-requests-using-the-express-framework
});

app.listen(3000, () => {
  console.log("Server is up");
});


// function createImage(text) {
//   fs.writeFileSync(
//     "out.png",
//     text2png(text, {
//       font: "80px sans-serif",
//       textColor: "teal",
//       bgColor: "linen",
//       lineSpacing: 10,
//       padding: 20
//     })
//   );
// }

function createImage(text) {
  const canvas = new Canvas();
  const ctx = canvas.getContext();
  const width = ctx.measureText(text).width;
  const height = ctx.measureText(text).height;

  canvas.width = width;
  canvas.height = height;

  return canvas.toDataURL();
}