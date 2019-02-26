import React from 'react'
import { SendEtherForm } from '../home/components/Forms/SendEtherForm'
import { TblRow } from '../ui'
import { Heading } from '../wallet/components'

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">

        <Heading routeHeading="Send Ether" />
        
        <table className="table-layout">
          <tbody>
            <TblRow caption="Send ETH:" Content={SendEtherForm} />
          </tbody>
        </table>

      </div>
    </div>
  </div>
)
