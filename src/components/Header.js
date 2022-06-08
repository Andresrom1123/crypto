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

  return (
    <ThemeProvider theme={colorTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography className={classes.title}>Crypto Hunter</Typography>
            <Select
              variant="outlined"
              style={{ widht: 100, height: 40, marginRight: 15 }}
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
