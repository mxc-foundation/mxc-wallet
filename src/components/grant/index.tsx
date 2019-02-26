import React from 'react'
import { GrantTokensForm } from '../home/components/Forms/GrantTokensForm'
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
        <Heading routeHeading="Grant Tokens" />

        <table className="table-layout">
          <tbody>
            <Row caption="Grant Tokens Now:" Content={GrantTokensForm} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
