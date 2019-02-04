import { evolve, pipe } from "ramda"
import * as React from "react"
import { connect } from "react-redux"
import { State } from "../../../selectors"
import * as selectors from "../../../selectors"
import * as FnBigNumber from "../../../utils/fnBignumber"
import { formatCurrency } from "../../../utils/formatter"
import { Balance as BalanceInterface } from "../reducers"

export interface BalanceProps {
  value: number
  fiatValue: number
}

const formatPrice = (etherPrice: number | null): string =>
  etherPrice ? `(${formatCurrency(etherPrice, "EUR")})` : ""

const Balance = (props: BalanceProps) => (
  <span>
    {props.value} {formatPrice(props.fiatValue)}
  </span>
)

const balanceToBalanceProps: (
  tokenBalance: BalanceInterface
) => BalanceProps = evolve({
  animation: {
    lastBalance: pipe(
      FnBigNumber.fromWei,
      FnBigNumber.toNumber
    )
  },
  value: pipe(
    FnBigNumber.fromWei,
    FnBigNumber.toNumber
  )
}) as (tokenBalance: BalanceInterface) => BalanceProps

const mapStateToEtherBalanceProps: (state: State) => BalanceProps = pipe(
  selectors.getEtherBalance,
  balanceToBalanceProps
)

const ConnectedEtherBalance = connect(mapStateToEtherBalanceProps)(Balance)

export { ConnectedEtherBalance as EtherBalance }
