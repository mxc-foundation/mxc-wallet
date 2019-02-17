import React from 'react'
import { GrantTokensForm } from '../home/components/Forms/GrantTokensForm'
import { Address, EtherBalance, TokenBalance } from '../wallet/components'

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
            <Row caption="Grant Tokens Now:" Content={GrantTokensForm} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
