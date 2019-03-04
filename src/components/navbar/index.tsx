import React from 'react'
import { NavLink } from 'react-router-dom'

export default () => (
  <div className="menuRouter">
    <div className="box-inner">
      <a className="logo" href="">
        <div className="blur-box">
          <div className="box-inner">
            <div className="blur-ball" />
            <div className="blur-ball" />
            <div className="blur-ball" />
            <div className="blur-ball" />
          </div>
        </div>
      </a>

      <ul>
        <li>
          <NavLink to="/" exact>
            <span>Wallet</span>
            <i className="icon icon-wallet" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions">
            <span>Transactions</span>
            <i className="mxc-icon-t icon icon-t-trans"/>
          </NavLink>
        </li>
        <li>
          <NavLink to="/send-tokens">
            <span>Send MXC</span>
            <i className="mxc-icon-t icon icon-t-arrowNE"/>
          </NavLink>
        </li>
        <li>
          <NavLink to="/send-ether">
            <span>Send ETH</span>
            <i className="mxc-icon-t icon icon-t-arrowNE"/>
          </NavLink>
        </li>
        <li>
          <NavLink to="/grant" exact>
            <span>Grant</span>
            <i className="mxc-icon-t icon icon-t-grant"/>
          </NavLink>
        </li>
        <li>
          <a className="inactive">
            <span>M2M</span>
            <i className="icon icon-organization"/>
          </a>
        </li>
        <li>
          <br/>
        </li>
        <li>
          <NavLink to="/terms-and-conditions" exact>
            <span>Imprint</span>
            <i className="icon icon-briefcase" />
          </NavLink>          
        </li>
      </ul>
    </div>
  </div>
)
