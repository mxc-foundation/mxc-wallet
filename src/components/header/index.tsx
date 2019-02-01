import React from "react";
import Balance from "./components/Balance";

export default () => (
  <div
    className="header headroom headroom--top headroom--not-bottom"
    id="header"
  >
    <div className="box-inner">
      <div className="t-s-bold menuStatus inline-block" />
      <Balance />
    </div>
  </div>
);
