import * as R from 'ramda'
import React from 'react'
interface TransactionProps {
  type: 'incoming' | 'outgoing'
  fromTo: string
  amount: string
  asset: 'MXC' | 'ETH'
  date: string
}

const TRANSACTIONS: TransactionProps[] = [
  {
    amount: '0.1',
    asset: 'ETH',
    date: 'Jan 26',
    fromTo: '0x35bEF8bB57BB4230FCB86Df41e8B502E96d90dD9',
    type: 'incoming',
  },
  {
    amount: '0.1',
    asset: 'ETH',
    date: 'Jan 26',
    fromTo: '0x35bEF8bB57BB4230FCB86Df41e8B502E96d90dD9',
    type: 'outgoing',
  },
  {
    amount: '100',
    asset: 'MXC',
    date: 'Jan 26',
    fromTo: '0x35bEF8bB57BB4230FCB86Df41e8B502E96d90dD9',
    type: 'outgoing',
  },
]

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
  { type, fromTo, amount, asset, date }: TransactionProps,
  index: number
) => (
  <tr key={index}>
    <td className="">
      <h2>{date}</h2>
    </td>
    <td>
      <h3>{heading(type)}</h3>
      <p>
        <span>{fromTo}</span>
      </p>
    </td>
    <td>
      {amount}&nbsp;{asset}
    </td>
    <td>
      <a href="">
        <i className={`icon ${arrowClass(type)}`} />
      </a>
    </td>
  </tr>
)

export const Transactions = ({
  transactions = TRANSACTIONS,
}: TransactionsProps) => (
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
