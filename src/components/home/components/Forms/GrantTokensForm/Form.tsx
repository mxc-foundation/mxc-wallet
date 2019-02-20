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
      <StyledComponents.Container>
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
            placeholder="Cliff periods"
            component={InputField}
          />
          <Field
            type="number"
            name="vestingPeriods"
            placeholder="Vesting Periods"
            component={InputField}
          />
        </StyledComponents.VerticallyStretched>
        <StyledComponents.Vertically>
          <button disabled={!valid} type="submit" className="btn-framed">
            Send
          </button>
        </StyledComponents.Vertically>
      </StyledComponents.Container>
    </form>
  </StyledComponents.Wrapper>
)
