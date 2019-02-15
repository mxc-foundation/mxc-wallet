import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../../../../selectors'
import * as FnBigNumber from '../../../../../utils/fnBignumber'
import { RedeemTokensForm } from './RedeemTokensForm'
import { RedeemableTokensPreview } from './RedeemTokensPreview'

const redeemableTokensAvailable = R.pipe(
  selectors.getRedeemableTokensBalance,
  FnBigNumber.isZero,
  R.not
)

const mapStateToProps = R.applySpec({
  showRedeemTokensForm: redeemableTokensAvailable,
})

const RedeemTokensPanelComponent = ({
  showRedeemTokensForm,
}: {
  showRedeemTokensForm: boolean
}) =>
  showRedeemTokensForm ? <RedeemTokensForm /> : <RedeemableTokensPreview />

export const RedeemTokensPanel = connect(mapStateToProps)(
  RedeemTokensPanelComponent
)
