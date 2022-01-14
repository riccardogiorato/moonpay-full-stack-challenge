import url from "url";
import { Pair, GetExchangeOrderBook } from "../../../GetExchangeOrderBook";

import type { NextApiRequest, NextApiResponse } from "next";
import { GetBestOfferAsks } from "../../../GetBestOfferAsks";

type ResponseData =
  | {
      exchange: string;
      btcAmount: number;
      usdAmount: number;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const queryObject = url.parse(req.url, true).query;
  const amountBtc =
    queryObject?.amount && parseFloat(queryObject?.amount as string);

  if (!amountBtc)
    return res
      .status(500)
      .json({ error: "Missing required query parameter 'amount'" });

  if (amountBtc <= 0) {
    return res.status(500).json({ error: "amount must be greater than 0" });
  }

  const exchanges = [
    {
      name: "coinbase",
      url: "https://api.exchange.coinbase.com/products/BTC-USDT/book?level=2",
    },
    {
      name: "binance",
      url: "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=100",
    },
    {
      name: "kraken",
      url: "https://api.kraken.com/0/public/Depth?pair=BTCUSDT&count=100",
      getData: (responseBody: any) => {
        return responseBody.result.XBTUSDT;
      },
    },
    {
      name: "ftx",
      url: "https://ftx.com/api/markets/BTC/USDT/orderbook?depth=100",
      getData: (responseBody: any) => {
        return responseBody.result;
      },
    },
  ];
  const exchangesAsks: {
    name: string;
    asks: Pair[];
    usdtAmount: number;
  }[] = await Promise.all(
    exchanges.map(async (exchange) => {
      const orderBook = await GetExchangeOrderBook({
        orderBookUrl: exchange.url,
        getData: exchange.getData,
      });
      const usdtAmount = GetBestOfferAsks({
        requestedAmount: amountBtc,
        asks: orderBook.asks,
      });
      return {
        name: exchange.name,
        asks: orderBook.asks,
        usdtAmount,
      };
    })
  );

  const exchangesAsksSorted = exchangesAsks
    .sort((a, b) => a.usdtAmount - b.usdtAmount)
    .map((exchange) => ({
      exchange: exchange.name,
      btcAmount: amountBtc,
      usdAmount: exchange.usdtAmount,
    }));

  console.log(exchangesAsksSorted);

  res.status(200).json(exchangesAsksSorted[0]);
}

/*
EXTRA Exchanges alread working with current implementation
{
      name: "bitstamp",
      url: "https://www.bitstamp.net/api/v2/order_book/btcusdt/",
    },
         {
      name: "gemini",
      url: "https://api.gemini.com/v1/book/btcusd",
      getData: (responseBody: any) => {
        const geminiBook: {
          asks: PairFromApi[];
          bids: PairFromApi[];
        } = { asks: [], bids: [] };
        responseBody.bids.map((bid: any) => {
          geminiBook.bids.push([bid.price, bid.amount]);
        });
        responseBody.asks.map((ask: any) => {
          geminiBook.asks.push([ask.price, ask.amount]);
        });
        return geminiBook;
      },
    }, 
    */
