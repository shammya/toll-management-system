import { createTheme } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={createTheme({
      palette: {
        type: "light"
      },
    })}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </MuiThemeProvider>
    {/* <Fade>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SnackbarProvider maxSnack={12}>
            <ScrollToTop /> */}
    {/* </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </Fade> */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
