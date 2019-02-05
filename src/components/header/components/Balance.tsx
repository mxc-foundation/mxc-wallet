import React from 'react'

const ETHER_BALANCE = 10
const MXC_BALANCE = 10

const BalanceComponent = ({
  ethBalance,
  mxcBalance,
}: {
  ethBalance: number;
  mxcBalance: number;
}) => (
  <div className="balanceStatus inline-block">
    <span className="t-s-bold">Balance</span>
    <br />
    {`${mxcBalance} MXC`}
    <br />
    {`${ethBalance} ETH`}
  </div>
)

export default () => (
  <BalanceComponent ethBalance={ETHER_BALANCE} mxcBalance={MXC_BALANCE} />
) // TODO use connect to get the actual address
