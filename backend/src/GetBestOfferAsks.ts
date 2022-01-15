import { Pair } from "./GetExchangeOrderBook";

/**
 * GetBestOfferAsks
 * gives the best total price from an array of asks for a given amount,
 * if the amount of available amount is less than the given amount it returns -1
 */
export const GetBestOfferAsks = ({
  requestedAmount,
  asks,
}: {
  requestedAmount: number;
  asks: Pair[];
}): number => {
  let remainingAmountToBuy = requestedAmount;
  let totalPrice = 0;
  if (
    asks.some((ask): boolean => {
      remainingAmountToBuy -= ask.amount;
      totalPrice += ask.price * ask.amount;
      if (remainingAmountToBuy <= 0) {
        totalPrice -= ask.price * Math.abs(remainingAmountToBuy);
        remainingAmountToBuy = 0;
        return true;
      }
    })
  )
    return totalPrice;

  return -1;
};
