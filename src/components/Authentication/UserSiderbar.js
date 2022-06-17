import { Avatar, Drawer } from "@material-ui/core";
import { signOut } from "firebase/auth";
import React, { Fragment, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth, db } from "../../firebase";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { numberWithCommas } from "../Banner/Carousel";
import { useLocation } from "react-router-dom";

const UserSiderbar = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [state, setState] = useState(false);
  const {
    user,
    setAlert,
    coins,
    symbol,
    watchlist,
    loadingButton,
    setLoadingButton,
  } = CryptoState();

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && event.key === "Shift") {
      return;
    }

    setState(open);
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Log out Successfull !",
    });
  };

  const removeFromWatchList = async (coin) => {
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

  return (
    <div>
      <Fragment>
        <Avatar
          onClick={toggleDrawer(true)}
          className="-pointer -bg-primary"
          src={user.photoURL}
          alt={user.displayName || user.email}
        />
      </Fragment>
      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        <div
          className="d-flex flex-column p-5"
          style={{
            width: "350px",
            height: "100%",
            backgroundColor: loadingButton ? "#1f42706e" : "",
          }}
        >
          <div
            className="d-flex flex-column align-items-center gap-3"
            style={{
              flex: 1,
              height: "92%",
            }}
          >
            <Avatar
              className="-pointer -bg-primary"
              style={{
                width: "200px",
                height: "200px",
              }}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
            <span className="-color-oscuro fw-center text-bolder fs-4">
              {user.displayName || user.email}
            </span>
            <div
              className="rounded d-flex flex-column alig-items-center gap-3 p-4 border"
              style={{ width: "100%", overflowY: "scroll", flex: 1 }}
            >
              <span className="fs-6 text-center -color-neutro">Watchlist</span>
              {coins
                .filter((coin) => watchlist.includes(coin.id))
                .map((coin, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 border rounded d-flex justify-content-center align-items-center"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {coin.id === id ? (
                        <span className="pe-2 -color-secondary">
                          {coin.name}
                        </span>
                      ) : (
                        <a
                          href={`/coins/${coin.id}`}
                          className="pe-2 -pointer text-decoration-none -color-oscuro"
                        >
                          {coin.name}
                        </a>
                      )}
                      <span className="d-flex gap-2 align-items-center -color-oscuro">
                        {" "}
                        {symbol}
                        {numberWithCommas(coin.current_price.toFixed(2))}
                        <AiFillDelete
                          className="-pointer"
                          fontSize="15"
                          onClick={() => removeFromWatchList(coin)}
                        />
                      </span>
                    </div>
                  );
                })}
            </div>
            <div style={{ width: "100%" }}>
              <button
                className="btn border -bg-secondary"
                onClick={logOut}
                style={{ width: "100%" }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default UserSiderbar;
