import React from 'react'
import { VestingStatus } from '../../../../../wallet/components/VestingStatus'
import * as StyledComponents from '../../StyledComponents'

export const RedeemableTokensPreview = () => (
  <StyledComponents.SpreadHorizontally>
    <VestingStatus />
    <button disabled className="btn-framed-disabled">
      Redeem
    </button>
  </StyledComponents.SpreadHorizontally>
)
