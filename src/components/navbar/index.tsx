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
        <li>
          <a href="" className="">
            <span>Accounts</span>
            <i className="icon icon-wallet" />
          </a>
        </li>
        <li>
          <a href="" className="active">
            <span>Transactions</span>
            <i className="mxc-icon icon-transactions">
              <svg>
                <title>AXS_icon_transactions</title>
                <desc>Created with Sketch.</desc>
                <g
                  id="AXS_icon_transactions"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <path
                    d="M90.0461538,79.1230769 L9.27692308,79.1230769"
                    id="Path"
                    stroke="#FFFFFF"
                    stroke-width="11.8846154"
                  />
                  <polyline
                    id="Path"
                    stroke="#FFFFFF"
                    stroke-width="11.2692308"
                    points="27.1769231 62.9423077 9.27692308 79.1230769 27.1769231 95.3076923"
                  />
                  <path
                    d="M9.27692308,34.5692308 L90.0461538,34.5673077"
                    id="Path"
                    stroke="#FFFFFF"
                    stroke-width="11.8846154"
                  />
                  <polyline
                    id="Path"
                    stroke="#FFFFFF"
                    stroke-width="11.2692308"
                    points="72.15 18.3846154 90.0461538 34.5692308 72.15 50.75"
                  />
                </g>
              </svg>
            </i>
          </a>
        </li>
        <li>
          <a href="" className="">
            <span>Contracts</span>
            <i className="icon icon-contracts" />
          </a>
        </li>

        <li>
          <a href="">
            <span>Send</span>
            <i className="icon icon-arrow-up" />
          </a>
        </li>
      </ul>
    </div>
  </div>
);
