import React, { StatelessComponent } from 'react'
import { Address, EtherBalance, TokenBalance } from '../wallet/components'
import LockedMxcTokens from './components/LockedMxcTokens'
import RedeemableMxcTokens from './components/RedeemableMxcTokens'
import RedeemButton from './components/RedeemButton'
import SendButton from './components/SendButton'

const InputAddress = () => (
  <input
    type="text"
    name="filter-transactions"
    placeholder="Recieving address"
  />
)

const Row = ({
  caption,
  Content,
  Button,
}: {
  caption: string
  Content: any
  Button?: any
}) => (
  <tr>
    <td>
      <h2>{caption}</h2>
    </td>
    <td>
      <Content />
    </td>
    {Button ? <Button /> : null}
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
            <Row
              caption="Redeemable MXC Tokens:"
              Content={RedeemableMxcTokens}
              Button={RedeemButton}
            />
            <Row
              caption="Send Tokens:"
              Content={InputAddress}
              Button={SendButton}
            />
            <Row
              caption="Send Ether:"
              Content={InputAddress}
              Button={SendButton}
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
