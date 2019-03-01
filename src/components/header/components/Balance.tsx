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
    <span className="t-s-bold">
      <span className="divider">|</span>
        <i className="mxc-icon-t icon icon-t-wallet"/>
      Balance&nbsp;
    </span>
    <HeaderBalance Content={TokenBalance} asset="MXC" />
    <HeaderBalance Content={EtherBalance} asset="ETH" />
  </div>
)

export default BalanceComponent
