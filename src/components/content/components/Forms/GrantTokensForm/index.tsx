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
import * as actions from './actions'
import { Form } from './Form'

const mapStateToProps = R.applySpec({
  tokenBalance: selectors.getTokenBalance,
  values: getFormValues('sendTokens'),
})

const mapDispatchToProps = {
  grantTokens: actions.grantTokens.request,
}

const validate = (values: any, { tokenBalance }: any) => ({
  amount: isEnough(R.prop('amount')(values), tokenBalance, 'tokens'),
  recipient: isEthereumAddress(R.prop('recipient')(values)),
})

const onSubmit = (
  values: {
    amount: number
    recipient: string
    cliffPeriods: number
    vestingPeriods: number
  },
  _: any,
  { grantTokens }: { grantTokens: (payload: actions.GrantTokenPayload) => void }
) =>
  R.pipe(
    R.evolve({
      amount: convertFromNumberToWeiString,
    }) as (arg: any) => actions.GrantTokenPayload,
    grantTokens
  )(values)

export const GrantTokensForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ validate, form: 'grantTokens', onSubmit })
)(Form)
