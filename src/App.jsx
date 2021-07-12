import React, { Component } from "react";

import Coin from "./components/Coin";
import CoinGraph from "./components/CoinGraph";

class App extends Component {
  render() {
    return (
      <div>
        <h1>coinpamp</h1>
        <p>see who's pamping your coin</p>
        <Coin name="Bitcoin" coinId="bitcoin" />
        <CoinGraph name="Bitcoin" />
      </div>
    );
  }
}

export default App;
