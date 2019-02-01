import React from "react";

interface balanceProps {
  mxcBalance: number;
  ethBalance: number;
}

const Balance = ({ mxcBalance, ethBalance }: balanceProps) => (
  <div className="balanceStatus inline-block">
    <span className="t-s-bold">Balance</span>
    <br />
    {`${mxcBalance} MXC`}
    <br />
    {`${ethBalance} ETH`}
  </div>
);

export default () => (
  <div
    className="header headroom headroom--top headroom--not-bottom"
    id="header"
  >
    <div className="box-inner">
      <div className="t-s-bold menuStatus inline-block" />
      <Balance mxcBalance={10} ethBalance={10} />
    </div>
  </div>
);
