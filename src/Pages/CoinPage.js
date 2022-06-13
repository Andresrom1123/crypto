import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress } from "@material-ui/core";
import { numberWithCommas } from "../components/Banner/Carousel";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "white" }} />;

  return (
    <main>
      <section className="d-flex flex-column flex-md-row py-5 px-3">
        <div className="col-12 col-md-5 -border-coin pe-3 mb-5">
          <div className="text-center">
            <img
              className="text-center"
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
            />
            <h3>{coin?.name}</h3>
            <div className="-title mx-auto mb-3"></div>
            <p
              className="fs-6 text-justify"
              style={{ width: "100%", textAlign: "justify" }}
            >
              {parse(coin?.description.en.split(". ")[0])}
            </p>
          </div>
          <div className="text-md-center mb-3">
            <span className="mb-2 d-block">
              <h5 className="d-inline">Rank: </h5>
              <h5 className="d-inline text-muted">
                {numberWithCommas(coin?.market_cap_rank)}
              </h5>
            </span>
            <span className="d-block mb-2">
              <h5 className="d-inline">Current Price: </h5>
              <h5 className="d-inline text-muted">
                {symbol}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </h5>
            </span>
            <span className="d-block">
              <h5 className="d-inline">Market Cap: </h5>
              <h5 className="d-inline text-muted">
                {symbol}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </h5>
            </span>
          </div>
        </div>
        <CoinInfo coin={coin} />
      </section>
    </main>
  );
};

export default CoinPage;
