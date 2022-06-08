import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";

import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import React from "react";
import { NavLink } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontWight: "bold",
    cursor: "pointer",
  },
}));

const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const Header = () => {
  const classes = useStyles();

  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={colorTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography className={classes.title}>
              <NavLink to="/">Crypto Hunter</NavLink>
            </Typography>
            <Select
              variant="outlined"
              style={{ widht: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
