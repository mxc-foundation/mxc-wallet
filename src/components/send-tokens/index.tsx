import React from 'react'
import { SendTokensForm } from '../home/components/Forms/SendTokensForm'
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

        <Heading routeHeading="Send MXC" />
        
        <table className="table-layout">
          <tbody>
            <Row caption="Send Tokens:" Content={SendTokensForm} />
          </tbody>
        </table>

      </div>
    </div>
  </div>
)
