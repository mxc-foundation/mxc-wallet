import React from 'react'
import Balance from './components/Balance'
import Network from './components/Network'
import Popup from './components/Popup'

export default () => (
<div>
  <Popup />
    <div
      className="header headroom headroom--top headroom--not-bottom"
      id="header"
    >
      <div className="box-inner">
        <div className="t-s-bold menuStatus inline-block" />
          <Network />
          <Balance />
      </div>

      <a target="_blank" href="https://discord.gg/6nENvRN" className="chat-box">
        <div className="box-inner">
          <div className="inline-block t-bold">
            Need Help? 
            <br/>
            Chat with us now
          </div>
          <div className="inline-block chat-icon">

            <div className="box-inner">
              <div className="blur-box">
                <div className="box-inner">
                    <div className="blur-ball"/>
                    <div className="blur-ball"/>
                    <div className="blur-ball"/>
                    <div className="blur-ball"/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </a>

    </div>
  </div>
)
