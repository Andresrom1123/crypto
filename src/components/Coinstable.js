import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { LinearProgress } from "@material-ui/core";
import { CoinList } from "../config/api";
import { numberWithCommas } from "./Banner/Carousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

const Coinstable = () => {
  let navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const listCoin = ["Coin", "Price", "24h Change", "Market Cap"];

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);

    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <section className="py-5 px-3">
      <h4 className="mb-3 text-center text-capitalize">
        Crypto currency Prices by Market Cap
      </h4>
      <div className="mx-auto -title mb-5"></div>
      <input
        className="form-control shadow"
        placeholder="Search For A Crypto Currency"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "grey" }} />
        ) : (
          <table className="table table-striped ">
            <thead className="">
              <tr>
                {listCoin.map((head) => (
                  <th
                    scope="col"
                    style={{
                      color: "black",
                      fontWeight: 700,
                    }}
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="">
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <tr
                      className="-pointer"
                      onClick={() => navigate(`coins/${row.id}`)}
                      key={row.name}
                    >
                      <th
                        content="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </th>
                      <th align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </th>
                      <th
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </th>
                      <th align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        count={parseInt((handleSearch()?.length / 10).toFixed(0))}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </section>
  );
};

export default Coinstable;
