import React from 'react'
import { SendTokensForm } from '../home/components/Forms/SendTokensForm'
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

        <Heading caption="Send MXC" Content={Address} />
        
        <table className="table-layout">
          <tbody>
            <Row caption="Send Tokens:" Content={SendTokensForm} />
          </tbody>
        </table>

      </div>
    </div>
  </div>
)
