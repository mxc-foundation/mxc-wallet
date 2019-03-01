import React from 'react'
import { NavLink } from 'react-router-dom'
import { BtnAction, TblRow } from '../ui'
import { EtherBalance, Heading, TokenBalance } from '../wallet/components'
import { M2MPanel } from './components/Forms/M2MPanel'
import { RedeemTokensPanel } from './components/Forms/RedeemTokensPanel'
import LockedMxcTokens from './components/LockedMxcTokens'

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">
        <Heading routeHeading="Your AXS Wallet" />
        <table className="table-cards">
          <tbody>
            <TblRow caption="Ether Balance:" Content={EtherBalance} />
            <TblRow caption="MXC Tokens:" Content={TokenBalance} />
            <TblRow caption="Locked MXC Tokens:" Content={LockedMxcTokens} />
            <TblRow caption="Redeemable MXC Tokens:" Content={RedeemTokensPanel} />
            <TblRow caption="M2M Wallet" Content={M2MPanel} />
          </tbody>
        </table>
        
        <NavLink to="/send-tokens" exact>
          <BtnAction Content="Send Tokens" disabled={false} type="" icon="icon-t-arrowNE"/>
        </NavLink>
        <NavLink to="/send-ether" exact>
          <BtnAction Content="Send Ether" disabled={false} type="" icon="icon-t-arrowNE"/>
        </NavLink>

      </div>
    </div>
  </div>
)
