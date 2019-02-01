import React from "react";

const ETHER_BALANCE = 10;

const EthBalanceComponent = ({ ethBalance }: { ethBalance: number }) => (
  <div>{`${ethBalance} ETH`}</div>
);

export default () => <EthBalanceComponent ethBalance={ETHER_BALANCE} />;
