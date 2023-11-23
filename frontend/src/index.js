import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContextProvider from "./Context/AuthContextProvider";
import DataContextProvider from "./Context/DataContextProvider";

const theme = createTheme({
  mode: "light", // or 'dark'
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        
          <DataContextProvider>
          <AuthContextProvider>
              <App />
                </AuthContextProvider> 
          </DataContextProvider>
        
     
      </BrowserRouter>
    </ChakraProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
