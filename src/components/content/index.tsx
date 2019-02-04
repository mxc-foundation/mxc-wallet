import React, { StatelessComponent } from "react"
import { Address } from "../wallet/components"
import EthBalance from "./components/EthBalance"
import MxcTokens from "./components/MxcTokens"
import LockedMxcTokens from "./components/LockedMxcTokens"
import RedeemableMxcTokens from "./components/RedeemableMxcTokens"
import SendButton from "./components/SendButton"
import RedeemButton from "./components/RedeemButton"

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
  Button
}: {
  caption: string
  Content: any
  Button?: StatelessComponent
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
            <Row caption="Ether Balance:" Content={EthBalance} />
            <Row caption="MXC Tokens:" Content={MxcTokens} />
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
