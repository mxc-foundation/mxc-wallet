import React from 'react'
import { Field } from 'redux-form'
import InputField from '../partials/inputField'
import * as StyledComponents from '../StyledComponents'

interface SendFormProps {
  valid: boolean
  handleSubmit: any
}
export const Form = ({ valid, handleSubmit }: SendFormProps) => (
  <StyledComponents.Wrapper>
    <form onSubmit={handleSubmit}>
      
        <StyledComponents.VerticallyStretched>
          <Field
            type="text"
            name="recipient"
            placeholder="Receiving address"
            component={InputField}
          />
          <Field
            type="number"
            name="amount"
            placeholder="Amount"
            component={InputField}
          />
          <Field
            type="number"
            name="cliffPeriods"
            placeholder="Cliff periods (Months)"
            component={InputField}
          />
          <Field
            type="number"
            name="vestingPeriods"
            placeholder="Vesting Periods (Months)"
            component={InputField}
          />
        </StyledComponents.VerticallyStretched>

        <button disabled={!valid} type="submit" className="btn-action">
          <div className="i-box">
            <div className="box-inner">
              <i className="mxc-icon-t icon icon-t-grant"></i>
            </div>
          </div>
          Grant
        </button>
        
    </form>
  </StyledComponents.Wrapper>
)
