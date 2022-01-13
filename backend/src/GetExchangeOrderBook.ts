import { request } from "undici";

export type Pair = {
  price: number;
  amount: number;
};

export type OrderBook = {
  asks: Pair[];
  bids: Pair[];
};

export const GetExchangeOrderBook = async ({
  orderBookUrl,
  getData,
}: {
  orderBookUrl: string;
  getData?: (responseBody: any) => OrderBook;
}): Promise<OrderBook> => {
  const asks: Pair[] = [];
  const bids: Pair[] = [];
  const { statusCode, body } = await request(orderBookUrl, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    },
  });
  if (statusCode === 200) {
    let json = await body.json();
    if (getData) {
      json = getData(json);
    }

    if (json.asks) {
      json.asks.forEach((ask: any) => {
        asks.push({
          price: parseFloat(ask[0]),
          amount: parseFloat(ask[1]),
        });
      });
    }
    if (json.bids) {
      json.bids.forEach((bids: any) => {
        bids.push({
          price: parseFloat(bids[0]),
          amount: parseFloat(bids[1]),
        });
      });
    }
  }
  return {
    asks,
    bids,
  };
};
