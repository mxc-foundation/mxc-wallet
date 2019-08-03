import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../selectors'
import { Heading } from '../wallet/components'

export type transactionTypes = 'incoming' | 'outgoing' | 'contract-interaction' | 'self-interaction'
export interface TransactionProps {
  type: transactionTypes
  fromTo: string
  value: string
  asset: 'MXC' | 'ETH'
  date: string
  link?: string
  hash: string
}

interface TransactionsProps {
  transactions: TransactionProps[]
  fetching: boolean
}

const heading: (type: transactionTypes) => string = R.cond([
  [R.equals('incoming'), R.always('Received from:')],
  [R.equals('outgoing'), R.always('Sent to:')],
  [R.equals('self-interaction'), R.always('Sent to yourself:')],
  [R.T, R.always('Contract interaction with:')],
])

const takeAsset = R.nthArg(0)
const takeValue = R.nthArg(2)

const createCurrencyString: (
  asset: 'MXC' | 'ETH',
  type: transactionTypes,
  value: string
) => string = R.converge(R.concat, [
  takeValue,
  R.pipe(
    takeAsset,
    R.concat('\u00A0')
  ),
])

const valueOfTransaction: (
  asset: 'MXC' | 'ETH',
  type: transactionTypes,
  value: string
) => string = R.ifElse(
  R.pipe(
    R.nthArg(1),
    R.equals('contract-interaction')
  ),
  R.always(''),
  createCurrencyString as any
)

const arrowClass: (type: transactionTypes) => string = R.ifElse(
  R.equals('incoming'),
  R.always('icon-arrow-left'),
  R.always('icon-arrow-right')
)

const Transaction = (
  { type, fromTo, value, asset, date, link }: TransactionProps,
  index: number
) => (
  <tr key={index}>
    <a href={link} target="_blank">
      <td className="cell-date">
        <span className="t-s t-bold">{date}</span>
      </td>
      <td className="cell-fromto">
        <span className="t-s t-bold">
          {heading(type)}
        </span>
        <br />
        <span>{fromTo}</span>
      </td>
      <td className="cell-asset">
        <span className="t-s t-bold">
          {valueOfTransaction(asset, type, value)}
        </span>
      </td>
      <td className="cell-icon">
        <i className={`icon ${arrowClass(type)}`} />
      </td>
    </a>
  </tr>
)

const TransactionsComponent = ({
  transactions,
  fetching,
}: TransactionsProps) => {
  // Find any consecutive transactions hashes. These represent transactions where the
  // sender address is also the recipient address. Remove one of the two so that a link
  // to the transaction is not shown in the transaction list twice.
  const txsWithoutDuplicatesToSelf = transactions.filter((value, index, array) => {
    return value.hash !== (array[index-1] && array[index-1].hash)
  })

  return (
    <div className="content">
      <div className="box-inner">
        <div className="content-box content-transactions">
          <Heading routeHeading="Latest Transactions" />

          {fetching ? (
            'Fetching transactions'
          ) : (
            <table className="table-cards table-zebra table-transactions">
              <tbody>
                {R.addIndex<TransactionProps>(R.map)(Transaction)(txsWithoutDuplicatesToSelf)}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps: (
  state: selectors.State
) => TransactionsProps = R.applySpec({
  fetching: selectors.getFetchingTransactions,
  transactions: selectors.getTransactions,
})

export const Transactions = connect(mapStateToProps)(TransactionsComponent)
