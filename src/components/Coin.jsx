import React, { useEffect, useState } from "react";

const usdFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function parseCoinData(data) {
  if ("coin" in data) {
    let name = data.coin.id;
    let pricef = usdFormatter.format(data.coin.price);
    return (
      <div>
        {name}: {pricef}
      </div>
    );
  }
  return <div>error: failed to parse coin data</div>;
}

const Coin = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.coinstats.app/public/v1/coins/${props.coinId}?currency=USD`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [props.coinId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return parseCoinData(data);
  }
};

export default Coin;
