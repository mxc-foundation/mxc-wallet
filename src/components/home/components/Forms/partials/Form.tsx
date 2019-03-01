import React from 'react'
import { Field } from 'redux-form'
import { BtnAction } from '../../../../ui'
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

        <BtnAction Content="Send" disabled={!valid} type="submit" icon="icon-t-arrowNE"/>
        
    </form>
  </StyledComponents.Wrapper>
)
