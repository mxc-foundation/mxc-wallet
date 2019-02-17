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

export interface SendEtherFormCompontentProps {
  valid: boolean
  handleSubmit: any
  sendEtherToRecipient: (payload: actions.SendEtherPayload) => void
}

const mapStateToProps = R.applySpec({
  etherBalance: selectors.getEtherBalance,
  values: getFormValues('sendEther'),
})

const mapDispatchToProps = {
  sendEtherToRecipient: actions.sendEther.request,
}

const validate = (values: any, { etherBalance }: any) => ({
  amount: isEnough(R.prop('amount')(values), etherBalance),
  recipient: isEthereumAddress(R.prop('recipient')(values)),
})

const onSubmit = (
  values: { amount: number; recipient: string },
  _: any,
  {
    sendEtherToRecipient,
  }: { sendEtherToRecipient: (payload: actions.SendEtherPayload) => void }
) =>
  R.pipe(
    R.evolve({
      amount: convertFromNumberToWeiString,
    }) as (arg: any) => actions.SendEtherPayload,
    sendEtherToRecipient
  )(values)

export const SendEtherForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ validate, form: 'sendEther', onSubmit })
)(Form)
