import React, { StatelessComponent } from "react"
import Address from "./components/Address"

const ETHER_ADDRESS = "0x35bEhjq93n7BB4230FCB86Df41e8B502E96hjd7en"
const ETHER_BALANCE = 10
const MXC_TOKENS = 10
const LOCKED_MXC = 3
const REDEEM_MXC = 7

const EthBalance = ({ ethBalance }: { ethBalance: number }) => (
  <div>{`${ethBalance} ETH`}</div>
)

const MxcTokens = ({ mxcTokens }: { mxcTokens: number }) => (
  <div>{`${mxcTokens} MXC`}</div>
)

const LockedMxcTokens = ({ lockedMXCTokens }: { lockedMXCTokens: number }) => (
  <div>{lockedMXCTokens}</div>
)

const RedeemableMxcTokens = ({
  redeemableMXCTokens
}: {
  redeemableMXCTokens: number
}) => <div>{redeemableMXCTokens}</div>

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
  Content: StatelessComponent
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
            <tr>
              <td>
                <h2>Ether Balance:</h2>
              </td>
              <td>
                <EthBalance ethBalance={ETHER_BALANCE} />
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <h2>MXC Tokens:</h2>
              </td>
              <td>
                <MxcTokens mxcTokens={MXC_TOKENS} />
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <h2>Locked MXC Tokens:</h2>
              </td>
              <td>
                <LockedMxcTokens lockedMXCTokens={LOCKED_MXC} />
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <h2>Redeemable MXC Tokens:</h2>
              </td>
              <td>
                <RedeemableMxcTokens redeemableMXCTokens={REDEEM_MXC} />
              </td>
              <td>
                <button className="btn-framed">Redeem</button>
              </td>
            </tr>
            <tr>
              <td>
                <h2>Send Tokens:</h2>
              </td>
              <td>
                <InputAddress />
              </td>
              <td>
                <button className="btn-framed">Send</button>
              </td>
            </tr>
            <tr>
              <td>
                <h2>Send Ether:</h2>
              </td>
              <td>
                <InputAddress />
              </td>
              <td>
                <button className="btn-framed">Send</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
