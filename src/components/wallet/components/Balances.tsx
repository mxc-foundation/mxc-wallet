import * as R from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'
import { State } from '../../../selectors'
import * as selectors from '../../../selectors'
import * as FnBigNumber from '../../../utils/fnBignumber'
import { formatCurrency } from '../../../utils/formatter'
import { Balance as BalanceInterface } from '../reducers'

export interface BalanceProps {
  value: string
}

const Balance = (props: BalanceProps) => <span>{props.value}</span>

const balanceToBalanceProps: (
  tokenBalance: BalanceInterface
) => BalanceProps = R.evolve({
  value: FnBigNumber.fromWei,
}) as (tokenBalance: BalanceInterface) => BalanceProps

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
