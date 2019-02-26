import React from 'react'
import { BtnAction } from '../ui'
import { EtherBalance, Heading, TokenBalance } from '../wallet/components'
import { M2MPanel } from './components/Forms/M2MPanel'
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

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">
        <Heading routeHeading="Your AXS Wallet" />
        <table className="table-cards">
          <tbody>
            <Row caption="Ether Balance:" Content={EtherBalance} />
            <Row caption="MXC Tokens:" Content={TokenBalance} />
            <Row caption="Locked MXC Tokens:" Content={LockedMxcTokens} />
            <Row caption="Redeemable MXC Tokens:" Content={RedeemTokensPanel} />
            <Row caption="M2M Wallet" Content={M2MPanel} />
          </tbody>
        </table>
        
        <a href="/send-tokens">
          <BtnAction Content="Send Tokens" disabled={false} type="" icon="icon-t-arrowNE"/>
        </a>
        <a href="/send-ether">
          <BtnAction Content="Send Ether" disabled={false} type="" icon="icon-t-arrowNE"/>
        </a>

      </div>
    </div>
  </div>
)
