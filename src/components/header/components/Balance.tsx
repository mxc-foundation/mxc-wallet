import React from 'react'
import { EtherBalance, TokenBalance } from '../../wallet/components'

const HeaderBalance = ({ Content, asset }: any) => (
  <span>
    {' '}
    <Content />
    &nbsp;
    <span>{asset}</span>
  </span>
)

const BalanceComponent = () => (
  <div className="balanceStatus inline-block">
    <span className="t-s-bold">Balance</span>
    <br />
    <HeaderBalance Content={TokenBalance} asset="MXC" />
    <br />
    <HeaderBalance Content={EtherBalance} asset="ETH" />
    <br />
  </div>
)

export default BalanceComponent
