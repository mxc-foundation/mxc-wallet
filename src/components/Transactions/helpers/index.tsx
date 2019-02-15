// http://api.kovan.etherscan.io/api?module=account&action=txlist&address=0xceC7a6E1883b9bA85D5608717C5F9D78c288cBCB&sort=asc&apikey=GKBJXUY561Q8URUJPXQKAGPACWQU1D1GEN
import formatBad from 'date-fns/format'
import * as R from 'ramda'
import request from 'superagent'
import Web3 from 'web3'
import * as FnBigNumber from '../../../utils/fnBignumber'
import { TransactionProps } from '../index'

const format = (formatString: string) => (timestamp: number) =>
  formatBad(timestamp, formatString)

interface EtherscanTransaction {
  blockNumber: string
  blockHash: string
  timeStamp: string
  hash: string
  nonce: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  txreceipt_status: string
  gasUsed: string
  confirmations: string
  isError: string
}

const parseAddress = Web3.utils.toChecksumAddress

const fromTo = R.curry(
  (address: string, transaction: EtherscanTransaction): string => {
    if (addressesEqual(transaction.from, address)) {
      return parseAddress(transaction.to)
    }
    return parseAddress(transaction.from)
  }
)

const type = R.curry(
  (
    address: string,
    transaction: EtherscanTransaction
  ): 'incoming' | 'outgoing' => {
    if (addressesEqual(transaction.from, address)) {
      return 'outgoing'
    }
    return 'incoming'
  }
)

const addressesEqual = (address1: string, address2: string) =>
  Web3.utils.toChecksumAddress(address1) ===
  Web3.utils.toChecksumAddress(address2)

export const parseEtherscanTransaction = R.curry(
  (address: string, etherScanTransaction: any) =>
    R.applySpec<TransactionProps>({
      asset: R.always('ETH'),
      date: R.pipe(
        R.nthArg(1),
        R.prop('timeStamp'),
        parseInt,
        R.multiply(1000),
        format('yyyy-MM-dd hh:mm:ss')
      ),
      fromTo,
      hash: R.pipe(
        R.nthArg(1),
        R.prop('hash')
      ),
      type,
      value: R.pipe(
        R.nthArg(1),
        R.prop('value'),
        FnBigNumber.fromWei,
        FnBigNumber.toString
      ),
    })(address, etherScanTransaction)
)

export const parseEtherscanReply = R.curry(
  (address: string, etherscanResult: any): TransactionProps[] =>
    R.map(parseEtherscanTransaction(address))(etherscanResult)
)

export const getTransactions = async (
  address: string,
  network: number
): Promise<TransactionProps[]> => {
  const { body: etherscanReply } = await request(
    `https://api${
      network === 42 ? '-kovan' : ''
    }.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=GKBJXUY561Q8URUJPXQKAGPACWQU1D1GEN`
  )
  return parseEtherscanReply(address, etherscanReply.result)
}
