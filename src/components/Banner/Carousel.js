import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { CoinList, TrendingCoins } from "../../config/api";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();

  const fetchtrendingCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchtrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <div
        className="d-flex flex-column -pointer"
        onClick={() => navigate(`/coins/${coin.id}`)}
      >
        <div>
          <img
            src={coin.image}
            alt={CoinList.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
        </div>
        <span
          className="text-uppercase -color-oscuro"
          style={{ fontSize: 22, fontWeight: 500 }}
        >
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="-color-neutro fw-bold" style={{ fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <>
      {loading ? (
        <div className="spinner-grow text-primary"></div>
      ) : (
        <div>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
          />
        </div>
      )}
    </>
  );
};

export default Carousel;
