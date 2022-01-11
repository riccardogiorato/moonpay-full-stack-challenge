import http from "http";
import url from "url";
import { request } from "undici";

//create a server object:
http
  .createServer(async function (req, res) {
    const path = req.url.split("?")[0];
    if (path && path === "/exchange-routing") {
      const queryObject = url.parse(req.url, true).query;
      const btcAmount =
        queryObject?.amount && parseInt(queryObject?.amount as string);

      if (!btcAmount) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Missing amount");
        res.end();
      } else {
        const { statusCode: coinbaseStatus, body: coinbaseBody } = await request(
          "https://api.exchange.coinbase.com/products/BTC-USD/book?level=1",
          {
            method: 'GET',
            headers: {
              "User-Agent" :"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
            }
          }
        );

        console.log("coinbaseStatus", coinbaseStatus);
        console.log("coinbaseBody", await coinbaseBody.json());

        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            btcAmount,
            usdAmount: 10000,
            exchange: "coinbase",
          })
        );
        res.end();
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(
        "<h1>404 Not Found</h1><p><a href='/exchange-routing?amount=100'>You can only visit /exchange-routing</a></p>"
      );
      res.end();
    }
  })
  .listen(4000, function () {
    console.log("server start at port 4000"); //the server object listens on port 3000
  });
