import React from 'react'
import { SendEtherForm } from '../home/components/Forms/SendEtherForm'
import { Address } from '../wallet/components'

const Row = ({ caption, Content }: { caption: string; Content: any }) => (
  <tr>
    <td>
      <span className="t-s t-bold">{caption}</span>
    </td>
    <td>
      <Content />
    </td>
  </tr>
)

const Heading = ({ caption, Content }: { caption: string; Content: any }) => (
  <div>
    <h1>{caption}</h1>
    <h2>
      <Content />
      <i className="icon icon-contracts"/>
    </h2>
  </div>
)

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">

        <Heading caption="Send ETH" Content={Address} />
        
        <table className="table-layout">
          <tbody>
            <Row caption="Send ETH:" Content={SendEtherForm} />
          </tbody>
        </table>

      </div>
    </div>
  </div>
)
