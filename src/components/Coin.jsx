import React, { useEffect, useState } from "react";

const Coin = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.coinstats.app/public/v1/coins/bitcoin?currency=USD")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(items);
    if (items.coin) {
      let coin = items.coin;
      let name = coin.id;
      let price = coin.price;
      let formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
      let pricef = formatter.format(price);
      return (
        <div>
          {name}: {pricef}
        </div>
      );
    }
    return <div>?</div>;
  }
};

export default Coin;
