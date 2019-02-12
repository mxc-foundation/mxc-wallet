import React from 'react'
import { Route } from 'react-router'
import { Address, EtherBalance, TokenBalance } from '../wallet/components'
import { GrantTokensForm } from './components/Forms/GrantTokensForm'
import { RedeemTokensForm } from './components/Forms/RedeemTokensForm'
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

const GrantTokensFormRow = () => (
  <Row caption="Grant Tokens Now:" Content={GrantTokensForm} />
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
            <Row caption="Redeemable MXC Tokens:" Content={RedeemTokensForm} />
            <Row caption="Send Tokens:" Content={SendTokensForm} />
            <Route path="/grant" component={GrantTokensFormRow} />
            <Row caption="Send Ether:" Content={SendEtherForm} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
