import React from 'react'

import { connect } from 'react-redux'
import * as actions from './actions'

interface RedeemTokensButtonProps {
  onClick: () => void
}

const RedeemTokensButton = ({ onClick }: RedeemTokensButtonProps) => (
  <td>
    <button className="btn-framed" onClick={onClick}>
      Redeem
    </button>
  </td>
)

const mapDispatchToProps = {
  onClick: actions.redeemTokens.request,
}

export default connect(
  null,
  mapDispatchToProps
)(RedeemTokensButton)
