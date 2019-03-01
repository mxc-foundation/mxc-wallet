import React from 'react'
import { SendTokensForm } from '../home/components/Forms/SendTokensForm'
import { TblRow } from '../ui'
import { Heading } from '../wallet/components'

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">

        <Heading routeHeading="Send MXC" />
        
        <table className="table-layout">
          <tbody>
            <TblRow caption="Send Tokens:" Content={SendTokensForm} />
          </tbody>
        </table>

      </div>
    </div>
  </div>
)
