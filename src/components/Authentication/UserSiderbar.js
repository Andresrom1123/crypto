import { Avatar, Drawer } from "@material-ui/core";
import { signOut } from "firebase/auth";
import React, { Fragment, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

const UserSiderbar = () => {
  const [state, setState] = useState(false);
  const { user, setAlert, coin, symbol } = CryptoState();

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
              <span className="fs-6">Watchlist</span>
            </div>
          </div>
        </div>
        <div className="d-grid m-3">
          <button className="btn border -bg-secondary" onClick={logOut}>
            Log Out
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default UserSiderbar;
