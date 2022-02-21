import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const theme = createTheme();

export default function User({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  const history = useHistory();
  // console.log(history);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(event) => history.goBack()}
          >
            {title != "Home" ? <ArrowBackIcon /> : <></>}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <div>
            <Button color="secondary" variant="contained">
              Sign out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        {children}
      </Container>
    </>
  );
}

{
  /* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Sign out</MenuItem>
            </Menu> */
}
