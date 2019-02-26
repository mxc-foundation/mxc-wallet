import React from 'react'

const BtnAction = ({ Content, disabled, type, icon }: { Content: any; disabled: boolean; type: string; icon: string; }) => (
    <button className="btn-action" disabled={disabled} type={type}>
      <div className="i-box">
        <div className="box-inner">
          <i className={icon}/>
        </div>
      </div>
      {Content}
    </button>
)

export { BtnAction as BtnAction }