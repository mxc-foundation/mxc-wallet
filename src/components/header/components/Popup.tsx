import React from 'react'
import { BtnAction, TxtTerms } from '../../ui'

const Popup = () => (
    <div className="popup-box">
      <div className="box-inner">
        <div className="popup-card">
          <div className="box-inner">
            
            <TxtTerms/>

            <div className="txt-center">
              <form>
                <input id="inputTerms" type="checkbox" name="termsAgreement"/> I agree
              </form>

              <BtnAction Content="Submit" disabled={true} type="" icon="icon-t-arrowNE"/>
            </div>

          </div>
        </div>
      </div>
    </div>
)

export default Popup
