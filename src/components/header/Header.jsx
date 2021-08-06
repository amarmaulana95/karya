import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setuser] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push("/")
  };
  const handleGrafik = () => {
    history.push("/grafik")
  };
  const handleDashboard = () => {
    history.push("/dashboard")
  };

  useEffect(() => {
    try {
      let res = localStorage.getItem("user")
      console.log("localStorage -> res", JSON.parse(res))
      setuser(JSON.parse(res))
      if (JSON.parse(res) === null) {
        history.push("/")
      }
    } catch (error) {
    }
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'rgb(230, 89, 37)' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={handleDashboard}>
            Dashboard
          </Typography>

          <div className="row">
            <Button color="inherit" onClick={handleClick}>Menu</Button>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
            <MenuItem onClick={handleGrafik}>Grafik Laporan</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,

  },
}));
