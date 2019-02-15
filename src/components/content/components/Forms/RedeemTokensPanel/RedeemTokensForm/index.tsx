import React from 'react'
import { connect } from 'react-redux'
import { RedeemableBalance } from '../../../../../wallet/components/'
import * as StyledComponents from '../../StyledComponents'
import * as actions from '../actions'

interface RedeemTokensButtonProps {
  onClick: () => void
}

const RedeemTokensFormComponent = ({ onClick }: RedeemTokensButtonProps) => (
  <StyledComponents.SpreadHorizontally>
    <RedeemableBalance />
    <button className="btn-framed" onClick={onClick}>
      Redeem
    </button>
  </StyledComponents.SpreadHorizontally>
)

const mapDispatchToProps = {
  onClick: actions.redeemTokens.request,
}

export const RedeemTokensForm = connect(
  null,
  mapDispatchToProps
)(RedeemTokensFormComponent)
