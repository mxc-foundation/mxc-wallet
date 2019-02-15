import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../selectors'

export interface TransactionProps {
  type: 'incoming' | 'outgoing'
  fromTo: string
  value: string
  asset: 'MXC' | 'ETH'
  date: string
  link?: string
  hash: string
}

interface TransactionsProps {
  transactions: TransactionProps[]
}

const heading: (type: 'incoming' | 'outgoing') => string = R.ifElse(
  R.equals('incoming'),
  R.always('Received'),
  R.always('Sent')
)

const arrowClass: (type: 'incoming' | 'outgoing') => string = R.ifElse(
  R.equals('incoming'),
  R.always('icon-arrow-left'),
  R.always('icon-arrow-right')
)

const Transaction = (
  { type, fromTo, value, asset, date, link }: TransactionProps,
  index: number
) => (
  <tr key={index}>
    <td className="">
      <h2>{date}</h2>
    </td>
    <td>
      <h3>{heading(type)}</h3>
      <p>
        <span>
          {type === 'incoming' ? 'From:' : 'To:'}&nbsp;{fromTo}
        </span>
      </p>
    </td>
    <td>
      {value}&nbsp;{asset}
    </td>
    <td>
      <a href={link} target="_blank">
        <i className={`icon ${arrowClass(type)}`} />
      </a>
    </td>
  </tr>
)

const TransactionsComponent = ({ transactions }: TransactionsProps) => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">
        <table className="table-cards table-zebra table-transactions">
          <tbody>
            {R.addIndex<TransactionProps>(R.map)(Transaction)(transactions)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

const mapStateToProps: (
  state: selectors.State
) => TransactionsProps = R.applySpec({
  transactions: selectors.getTransactions,
})

export const Transactions = connect(mapStateToProps)(TransactionsComponent)
