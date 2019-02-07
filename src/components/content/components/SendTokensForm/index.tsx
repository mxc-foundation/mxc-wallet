import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, getFormValues, reduxForm } from 'redux-form'
import styled from 'styled-components'
import Web3 from 'web3'
import * as selectors from '../../../../selectors'
import * as FnBigNumber from '../../../../utils/fnBignumber'
import InputField from '../inputField'
import { SpreadHorizontally } from '../RedeemTokensForm'
import * as actions from './actions'

export const isEthereumAddress = (address: string) =>
  Web3.utils.isAddress(address) ? undefined : 'Malformed Ethereum address.'

const hasEnoughToken = (
  tokensToSend: number = 0,
  tokenBalance: BigNumber
): string => {
  const tokensinWei = FnBigNumber.toWei(FnBigNumber.create(tokensToSend))
  if (tokensinWei.isZero() || tokensinWei.isNegative()) {
    return 'Only positive values are allowed.'
  }
  if (tokensinWei.gt(tokenBalance)) {
    return 'You do not have enough tokens.'
  }
  return ''
}

interface SendTokensFormCompontentProps {
  valid: boolean
  handleSubmit: any
  sendTokensToRecipient: (payload: actions.SendTokenPayload) => void
}

export const SendTokensFormCompontent = ({
  valid,
  handleSubmit,
}: SendTokensFormCompontentProps) => (
  <Wrapper>
    <form onSubmit={handleSubmit}>
      <Container>
        <VerticallyStretched>
          <Field
            type="text"
            name="recipient"
            placeholder="Recieving address"
            component={InputField}
          />
          <Field
            type="number"
            name="amount"
            placeholder="Amount"
            component={InputField}
          />
        </VerticallyStretched>
        <Vertically>
          <button disabled={!valid} type="submit" className="btn-framed">
            Send
          </button>
        </Vertically>
      </Container>
    </form>
  </Wrapper>
)

const mapStateToProps = R.applySpec({
  tokenBalance: selectors.getTokenBalance,
  values: getFormValues('sendTokens'),
})

const mapDispatchToProps = {
  sendTokensToRecipient: actions.sendTokens.request,
}

const validate = (values: any, { tokenBalance }: any) => ({
  amount: hasEnoughToken(R.prop('amount')(values), tokenBalance),
  recipient: isEthereumAddress(R.prop('recipient')(values)),
})

const onSubmit = (
  values: { amount: number; recipient: string },
  _: any,
  {
    sendTokensToRecipient,
  }: { sendTokensToRecipient: (payload: actions.SendTokenPayload) => void }
) =>
  R.pipe(
    R.evolve({
      amount: R.pipe(
        FnBigNumber.create,
        FnBigNumber.toWei,
        FnBigNumber.toString
      ),
      recipient: R.identity,
    }) as (arg: any) => actions.SendTokenPayload,
    sendTokensToRecipient
  )(values)

export const SendTokensForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ validate, form: 'sendTokens', onSubmit })
)(SendTokensFormCompontent)

const Wrapper = styled.div`
  overflow: hidden;
`

const Container = styled(SpreadHorizontally)`
  margin: 0 -20px;
`
const Vertically = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 20px;
`

const VerticallyStretched = styled(Vertically)`
  flex-grow: 2;
`
