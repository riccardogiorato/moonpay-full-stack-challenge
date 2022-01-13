import { Pair } from "./GetExchangeOrderBook";

export const GetBestOfferAsks = ({
  requestedAmount,
  asks,
}: {
  requestedAmount: number;
  asks: Pair[];
}) => {
  let remainingAmountToBuy = requestedAmount;
  let totalPrice = 0;
  asks.some((ask): boolean => {
    remainingAmountToBuy -= ask.amount;
    totalPrice += ask.price * ask.amount;
    if (remainingAmountToBuy <= 0) {
      totalPrice -= ask.price * Math.abs(remainingAmountToBuy);
      return true;
    }
  });
  return totalPrice;
};
