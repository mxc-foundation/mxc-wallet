import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../selectors'
import { Heading } from '../wallet/components'

export interface TransactionProps {
  type: 'incoming' | 'outgoing'
  fromTo: string
  isRecipientContract?: boolean
  isRecipientSender?: boolean
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
  { type, isRecipientContract, isRecipientSender, fromTo, value, asset, date, link }: TransactionProps,
  index: number
) => (
  <tr key={index}>
    <a href={link} target="_blank">
      <td className="cell-date">
        <span className="t-s t-bold">{date}</span>
      </td>
      <td className="cell-fromto">
        <span className="t-s t-bold">
        {
          isRecipientContract ? (
            'Contract Interaction:'
          ) : `${heading(type)} ${type === 'incoming' ? 'From:' : `To${isRecipientSender ? ' Yourself' : ''}:`}`
        }
        </span>
        <br/>
        <span>
          {fromTo}
        </span>
      </td>
      <td className="cell-asset">
        <span className="t-s t-bold">
          {value}&nbsp;{asset}
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

          {
            fetching
            ? 'Fetching transactions'
            : (
              <table className="table-cards table-zebra table-transactions">
                <tbody>
                  {R.addIndex<TransactionProps>(R.map)(Transaction)(txsWithoutDuplicatesToSelf)}
                </tbody>
              </table>
            )
          }
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
