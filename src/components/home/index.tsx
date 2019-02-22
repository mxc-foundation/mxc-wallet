import React from 'react'
import { Address, EtherBalance, TokenBalance } from '../wallet/components'
import { RedeemTokensPanel } from './components/Forms/RedeemTokensPanel'
import LockedMxcTokens from './components/LockedMxcTokens'

const Row = ({ caption, Content }: { caption: string; Content: any }) => (
  <tr>
    <td>
      <span className="t-s t-bold">{caption}</span>
    </td>
    <td>
      <Content />
    </td>
    <td />
  </tr>
)
const Heading = ({ caption, Content }: { caption: string; Content: any }) => (
  <div>
    <h1>{caption}</h1>
    <h2>
      <Content />
      <i className="icon icon-contracts"></i>
    </h2>
  </div>
)

const BtnAction = ({ caption, Content }: { caption: string; Content: any }) => (
  <a href={caption}>
    <button className="btn-action">
      <div className="i-box">
        <div className="box-inner">
          <i className="mxc-icon-t icon icon-t-arrowNE"></i>
        </div>
      </div>
      {Content}
    </button>
  </a>
)

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">
        <Heading caption="Your AXS Wallet" Content={Address} />
        <table className="table-cards">
          <tbody>
            <Row caption="Ether Balance:" Content={EtherBalance} />
            <Row caption="MXC Tokens:" Content={TokenBalance} />
            <Row caption="Locked MXC Tokens:" Content={LockedMxcTokens} />
            <Row caption="Redeemable MXC Tokens:" Content={RedeemTokensPanel} />
          </tbody>
        </table>
        
        <BtnAction caption="/send-tokens" Content="Send Tokens" />
        <BtnAction caption="/send-ether" Content="Send Ether" />

      </div>
    </div>
  </div>
)
