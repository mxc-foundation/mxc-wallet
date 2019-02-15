import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../../../../../selectors'
import * as FnBignumber from '../../../../../../utils/fnBignumber'
import { RedeemableBalance } from '../../../../../wallet/components/'
import * as StyledComponents from '../../StyledComponents'
import * as actions from '../actions'
interface RedeemTokensButtonProps {
  onClick: () => void
  disabled: boolean
  disabledReason: string
}

const RedeemTokensFormComponent = ({
  onClick,
  disabled,
  disabledReason = 'You need ether in your wallet to redeem.',
}: RedeemTokensButtonProps) => (
  <StyledComponents.SpreadHorizontally>
    <RedeemableBalance />
    {disabled ? disabledReason : ''}
    <button
      disabled={disabled}
      className={`${disabled ? 'btn-framed-disabled' : 'btn-framed'}`}
      onClick={onClick}
    >
      Redeem
    </button>
  </StyledComponents.SpreadHorizontally>
)

const mapStateToProps = R.applySpec({
  disabled: R.pipe(
    selectors.getEtherBalance,
    FnBignumber.isZero
  ),
})

const mapDispatchToProps = {
  onClick: actions.redeemTokens.request,
}

export const RedeemTokensForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedeemTokensFormComponent)
