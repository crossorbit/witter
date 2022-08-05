import React from 'react';
import { createRoot } from "react-dom/client";
//import App from './components/App';
import App from 'components/App';
//import firebase from "./firebase";
import "./styles.css";

/* 클론 코딩 가이드 -> React 버전 변경으로 작동 안되는 코드 많음
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)
*/ 

const root = createRoot(document.getElementById("root"));

root.render(
  //<React.StrictMode>
  <App />
  //</React.StrictMode>
);

