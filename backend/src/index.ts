import http from "http";
import url from "url";
//create a server object:
http
  .createServer(async function (req, res) {
    const path = req.url.split("?")[0];
    if (path && path === "/exchange-routing") {
      const queryObject = url.parse(req.url, true).query;
      const amount =
        queryObject?.amount && parseInt(queryObject?.amount as string);

      if (!amount) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Missing amount");
        res.end();
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            btcAmount: 1,
            usdAmount: 10000,
            exchange: "coinbase",
          })
        );
        res.end();
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(
        "<h1>404 Not Found</h1><p><a href='/exchange-routing'>You can only visit /exchange-routing</a></p>"
      );
      res.end();
    }
  })
  .listen(4000, function () {
    console.log("server start at port 4000"); //the server object listens on port 3000
  });
