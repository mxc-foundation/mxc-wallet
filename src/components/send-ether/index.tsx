import React from 'react'
import { SendEtherForm } from '../home/components/Forms/SendEtherForm'
import { Heading } from '../wallet/components'

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

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">

        <Heading routeHeading="Send Ether" />
        
        <table className="table-layout">
          <tbody>
            <Row caption="Send ETH:" Content={SendEtherForm} />
          </tbody>
        </table>

      </div>
    </div>
  </div>
)
