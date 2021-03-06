import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getFormValues, reduxForm } from 'redux-form'
import * as selectors from '../../../../../selectors'
import {
  convertFromNumberToWeiString,
  isEnough,
  isEthereumAddress
} from '../helpers'
import { Form } from '../partials/Form'
import * as actions from './actions'

const mapStateToProps = R.applySpec({
  tokenBalance: selectors.getTokenBalance,
  values: getFormValues('sendTokens'),
})

const mapDispatchToProps = {
  sendTokensToRecipient: actions.sendTokens.request,
}

const validate = (values: any, { tokenBalance }: any) => ({
  amount: isEnough(R.prop('amount')(values), tokenBalance, 'tokens'),
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
      amount: convertFromNumberToWeiString,
    }) as (arg: any) => actions.SendTokenPayload,
    sendTokensToRecipient
  )(values)

export const SendTokensForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ validate, form: 'sendTokens', onSubmit })
)(Form)
