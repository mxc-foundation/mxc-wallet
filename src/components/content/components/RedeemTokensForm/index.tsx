import React from 'react'

import { connect } from 'react-redux'
import styled from 'styled-components'
import RedeemableMxcTokens from '../RedeemableMxcTokens'
import * as actions from './actions'

interface RedeemTokensButtonProps {
  onClick: () => void
}

const RedeemTokensButton = ({ onClick }: RedeemTokensButtonProps) => (
  <SpreadHorizontally>
    <RedeemableMxcTokens />
    <button className="btn-framed" onClick={onClick}>
      Redeem
    </button>
  </SpreadHorizontally>
)

const mapDispatchToProps = {
  onClick: actions.redeemTokens.request,
}

export const RedeemTokensForm = connect(
  null,
  mapDispatchToProps
)(RedeemTokensButton)

export const SpreadHorizontally = styled.div`
  display: flex;
  justify-content: space-between;
`
