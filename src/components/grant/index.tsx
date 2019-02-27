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
            <tr>
              <td>
                <span className="t-s t-bold">
                  <i className="icon icon-exclamation"></i>Warning:
                </span>
              </td>
              <td>
                If the recipient wallet has an MXC Smart Contract with tokens that are not redeemed, they will be unable to receive additional MXC grant. If you are in doubt, ask for another wallet address
              </td>
            </tr>
            <TblRow caption="Grant Tokens Now:" Content={GrantTokensForm} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
