import BigNumber from 'bn.js'
import * as R from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'
import { State } from '../../../selectors'
import * as selectors from '../../../selectors'
import * as FnBigNumber from '../../../utils/fnBignumber'
export interface BalanceProps {
  value: string
}

const Balance = (props: BalanceProps) => <span>{props.value}</span>

const balanceToBalanceProps: (
  tokenBalance: BigNumber
) => BalanceProps = R.applySpec({
  value: FnBigNumber.fromWei,
})

const mapStateToEtherBalanceProps: (state: State) => BalanceProps = R.pipe(
  selectors.getEtherBalance,
  balanceToBalanceProps
)

const mapStateToTokenBalanceProps: (state: State) => BalanceProps = R.pipe(
  selectors.getTokenBalance,
  balanceToBalanceProps
)

const ConnectedEtherBalance = connect(mapStateToEtherBalanceProps)(Balance)

const ConnectedTokenBalance = connect(mapStateToTokenBalanceProps)(Balance)

export {
  ConnectedEtherBalance as EtherBalance,
  ConnectedTokenBalance as TokenBalance
}
