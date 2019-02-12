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
        <li className="burger-box">
          <a id="burger" href="" className="">
            <i className="mxc-icon" />
          </a>
        </li>
        <li>
          <NavLink to="/" exact>
            <span>Home</span>
            <i className="icon icon-wallet" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions">
            <span>Transactions</span>
            <i className="icon icon-arrow-right" />
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
)
