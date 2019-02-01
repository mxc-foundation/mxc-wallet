import React from "react";

export default () => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">
        <h1 className="walletName">
          <span className="t-light">Latest</span> Transactions
        </h1>
        <input
          type="text"
          name="filter-transactions"
          placeholder="Filter transactions"
        />

        <button className="btn-framed">Incomming</button>
        <button className="btn-framed">Recieved</button>

        <table className="table-cards table-zebra table-transactions">
          <tbody>
            <tr>
              <td className="">
                <h2>Jan 26</h2>
              </td>
              <td>
                <h3>Recieved</h3>
                <p>
                  <span>0x35bEF8bB57BB4230FCB86Df41e8B502E96d90dD9</span>
                  <span>→</span>
                  <span>0xnx7EF8bB57BB4230FCB86Df41e8B502E9nd62m9</span>
                </p>
              </td>
              <td>0.1ETH</td>
              <td>
                <a href="">
                  <i className="icon icon-arrow-left" />
                </a>
              </td>
            </tr>

            <tr>
              <td className="">
                <h2>Jan 26</h2>
              </td>
              <td>
                <h3>Sent</h3>
                <p>
                  <span>0x35bEF8bB57BB4kjdhkshh6Df41e8B502E96d90d</span>
                  <span>→</span>
                  <span>0xnx7EF8bB57BB4kjdhkshh6Df41e8B502nd62md</span>
                </p>
              </td>
              <td>0.1ETH</td>
              <td>
                <a href="">
                  <i className="icon icon-arrow-right" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="">
                <h2>Jan 26</h2>
              </td>
              <td>
                <h3>Transfer between accounts</h3>
                <p>
                  <span>0x35bEhjq93n7BB4230FCB86Df41e8B502E96hjd7en</span>
                  <span>→</span>
                  <span>0xnx7Ehjq93n7BB4230FCB86Df41e8B502E9nd62mn</span>
                </p>
              </td>
              <td>0.1ETH</td>
              <td>
                <a href="">
                  <i className="icon icon-arrow-right" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
