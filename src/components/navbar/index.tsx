import React from "react";

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
          <a href="" className="active">
            <span>Home</span>
            <i className="icon icon-wallet" />
          </a>
        </li>
        <li>
          <a href="" className="">
            <span>Transactions</span>
            <i className="icon icon-arrow-right" />
          </a>
        </li>
      </ul>
    </div>
  </div>
);
