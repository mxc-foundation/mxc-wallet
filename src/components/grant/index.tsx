import React from 'react'
import { GrantTokensForm } from '../home/components/Forms/GrantTokensForm'
import { TblRow } from '../ui'
import { Heading } from '../wallet/components'

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">
        <Heading routeHeading="Grant Tokens" />

        <table className="table-layout">
          <tbody>
            <TblRow caption="Grant Tokens Now:" Content={GrantTokensForm} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
