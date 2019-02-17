import React from 'react'
import { Address, EtherBalance, TokenBalance } from '../wallet/components'
import { RedeemTokensPanel } from './components/Forms/RedeemTokensPanel'
import { SendEtherForm } from './components/Forms/SendEtherForm'
import { SendTokensForm } from './components/Forms/SendTokensForm'
import LockedMxcTokens from './components/LockedMxcTokens'

const Row = ({ caption, Content }: { caption: string; Content: any }) => (
  <tr>
    <td>
      <h2>{caption}</h2>
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
        <table className="table-cards  table-transactions">
          <tbody>
            <Row caption="Your Address:" Content={Address} />
            <Row caption="Ether Balance:" Content={EtherBalance} />
            <Row caption="MXC Tokens:" Content={TokenBalance} />
            <Row caption="Locked MXC Tokens:" Content={LockedMxcTokens} />
            <Row caption="Redeemable MXC Tokens:" Content={RedeemTokensPanel} />
            <Row caption="Send Tokens:" Content={SendTokensForm} />
            <Row caption="Send Ether:" Content={SendEtherForm} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
