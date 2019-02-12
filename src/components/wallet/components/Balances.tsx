import BigNumber from 'bignumber.js'
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
  value: R.pipe(
    FnBigNumber.fromWei,
    FnBigNumber.toString
  ),
})

const mapStateToEtherBalanceProps: (state: State) => BalanceProps = R.pipe(
  selectors.getEtherBalance,
  balanceToBalanceProps
)

const mapStateToTokenBalanceProps: (state: State) => BalanceProps = R.pipe(
  selectors.getTokenBalance,
  balanceToBalanceProps
)

const mapStateToRedeemableBalanceProps: (state: State) => BalanceProps = R.pipe(
  selectors.getRedeemableTokensBalance,
  balanceToBalanceProps
)

const ConnectedEtherBalance = connect(mapStateToEtherBalanceProps)(Balance)

const ConnectedTokenBalance = connect(mapStateToTokenBalanceProps)(Balance)

const ConnectedRedeemableBalance = connect(mapStateToRedeemableBalanceProps)(
  Balance
)

export {
  ConnectedEtherBalance as EtherBalance,
  ConnectedTokenBalance as TokenBalance,
  ConnectedRedeemableBalance as RedeemableBalance
}
