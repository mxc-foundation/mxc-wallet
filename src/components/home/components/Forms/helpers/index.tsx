import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import Web3 from 'web3'
import * as FnBigNumber from '../../../../../utils/fnBignumber'
export const isEthereumAddress = (address: string) =>
  Web3.utils.isAddress(address) ? undefined : 'Malformed Ethereum address.'

export const isEnough = (
  etherToSend: number = 0,
  etherBalance: BigNumber,
  asset: string = 'ether'
): string => {
  try {
    const etherInWei = FnBigNumber.toWei(FnBigNumber.create(etherToSend))
    if (etherInWei.isZero() || etherInWei.isNegative()) {
      return 'Amount is too small.'
    }
    if (etherInWei.gt(etherBalance)) {
      return `You do not have enough ${asset}.`
    }
  } catch (error) {
    return 'Illegal value.'
  }
  return ''
}

export const convertFromNumberToWeiString = R.pipe(
  FnBigNumber.create,
  FnBigNumber.toWei,
  FnBigNumber.toString
)
