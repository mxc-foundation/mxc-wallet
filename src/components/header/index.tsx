import React from "react";

export default () => (
  <div
    className="header headroom headroom--top headroom--not-bottom"
    id="header"
  >
    <div className="box-inner">
      <div className="t-s-bold menuStatus inline-block" />
      <div className="balanceStatus inline-block">
        <span className="t-s-bold">Balance</span>
        <br />
        XX.XX MXC
        <br />
        XX.XX ETH
      </div>
    </div>
  </div>
);
