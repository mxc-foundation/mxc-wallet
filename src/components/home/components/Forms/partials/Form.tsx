import React from 'react'
import { Field } from 'redux-form'
import * as StyledComponents from '../StyledComponents'
import InputField from './inputField'

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
        </StyledComponents.VerticallyStretched>

        <button disabled={!valid} type="submit" className="btn-action">
          <div className="i-box">
            <div className="box-inner">
              <i className="mxc-icon-t icon icon-t-arrowNE"/>
            </div>
          </div>
          Send
        </button>
        
    </form>
  </StyledComponents.Wrapper>
)
