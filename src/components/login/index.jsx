import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../assets/styles/login';
import { useHistory } from "react-router-dom";
import Service from '../../services/UserService'

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [alertMessage, setalertMessage] = useState("")

  const handleChange = (e, name) => {
    setusername(name === "username" ? e.target.value : username)
    setpassword(name === "password" ? e.target.value : password)
    console.log("handleChange -> e.target.value", e.target.value)
    setalertMessage("")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let credentials = { 'username': username, 'password': password }
    if (username === "" || password === "") {
      setalertMessage("username/password tidak boleh kosong!")
    } else {
      try {
        let res = await Service.userLogin(credentials);
        console.log("handleSubmit -> res", res.data.token)
        if (res.data.status === 200) {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("user", JSON.stringify(res.data))
          setTimeout(() => {
            history.push("/dashboard")
          }, 500);
        } else if (res.data.status === 401) {
          setalertMessage("Username/password salah!")
        } else {
          setalertMessage("Periksa kembali koneksi internet anda")
        }
      } catch (error) {
        console.log("handleSubmit -> error", error)
        setalertMessage("Periksa kembali koneksi internet anda")
      }
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("token"); // get token 
    if (token !== null) {
      console.log("masuk");
      history.push("/dashboard")
    } else {
      console.log("login");

    }
    console.log("Login -> token", token)
  }, [])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5" style={{ color: '#acacac' }}>
            Portal Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              // autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => handleChange(e, "username")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => handleChange(e, "password")}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <p className={classes.alertText}>{alertMessage}</p>
            <Button
              style={{ backgroundColor: '#e65925' }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
