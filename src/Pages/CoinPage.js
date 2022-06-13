import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress } from "@material-ui/core";
import { numberWithCommas } from "../components/Banner/Carousel";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import Header from "../components/Header";

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
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <main>
      <Header />
      <section className="d-flex flex-column flex-md-row py-5 px-3">
        <div className="col-12 col-md-5">
          <div className="text-center">
            <img
              className="text-center"
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
            />
            <h3>{coin?.name}</h3>
            <h5>{parse(coin?.description.en.split(". ")[0])}</h5>
          </div>
          <div className="text-md-center tex-start">
            <span>
              <h5>Rank: {numberWithCommas(coin?.market_cap_rank)}</h5>
            </span>
            <span>
              <h5>Market Cap:</h5>
              <h5>
                {symbol}{" "}
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
