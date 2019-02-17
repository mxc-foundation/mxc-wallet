import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../../selectors'
import * as FnBigNumber from '../../../utils/fnBignumber'
const LockedMxcTokensComponent = ({
  lockedMXCTokens,
}: {
  lockedMXCTokens: string
}) => <div>{lockedMXCTokens}</div>

const mapStateToProps = R.applySpec({
  lockedMXCTokens: R.pipe(
    selectors.getLockedTokensBalance,
    FnBigNumber.fromWei,
    FnBigNumber.toString
  ),
})

export default connect(mapStateToProps)(LockedMxcTokensComponent)
