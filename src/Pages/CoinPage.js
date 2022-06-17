import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress } from "@material-ui/core";
import { numberWithCommas } from "../components/Banner/Carousel";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const {
    currency,
    symbol,
    watchlist,
    user,
    setAlert,
    loadingButton,
    setLoadingButton,
  } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  const inWatchList = watchlist.includes(coin?.id);

  const addToWatchList = async () => {
    setLoadingButton(true);
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
    setLoadingButton(false);
  };

  const removeFromWatchList = async () => {
    setLoadingButton(true);
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((watch) => watch !== coin?.id) },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
    setLoadingButton(false);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "white" }} />;

  return (
    <main>
      <section className="d-flex flex-column flex-md-row pt-5 px-3">
        <div className="col-12 col-md-5 -border-coin pe-3 mb-5">
          <div className="text-center">
            <img
              className="text-center"
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
            />
            <h3 className="-color-oscuro">{coin?.name}</h3>
            <div className="-title mx-auto mb-3"></div>
            <p
              className="fs-6 text-justify -color-oscuro"
              style={{ width: "100%", textAlign: "justify" }}
            >
              {parse(coin?.description.en.split(". ")[0])}
            </p>
          </div>
          <div className="text-md-center mb-3">
            <span className="mb-2 d-block">
              <h5 className="d-inline">Rank: </h5>
              <h5 className="d-inline -color-neutro">
                {numberWithCommas(coin?.market_cap_rank)}
              </h5>
            </span>
            <span className="d-block mb-2">
              <h5 className="d-inline">Current Price: </h5>
              <h5 className="d-inline -color-neutro">
                {symbol}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </h5>
            </span>
            <span className="d-block">
              <h5 className="d-inline">Market Cap: </h5>
              <h5 className="d-inline -color-neutro">
                {symbol}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </h5>
            </span>
            {user && (
              <div className="d-grid">
                <button
                  disabled={loadingButton}
                  type="submit"
                  className={`shadow -color-oscuro -pointer py-2 fs-6 -button rounded mt-3 ${
                    inWatchList && "-bg-secondary -color-claro"
                  }`}
                  style={{
                    border: "1px solid var(--clr-neutro)",
                  }}
                  onClick={inWatchList ? removeFromWatchList : addToWatchList}
                >
                  {inWatchList ? "Remove from Watchlist" : "Add to Watch list"}
                </button>
              </div>
            )}
          </div>
        </div>
        <CoinInfo coin={coin} />
      </section>
    </main>
  );
};

export default CoinPage;
