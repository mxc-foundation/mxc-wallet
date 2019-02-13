import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import Web3 from 'web3'

export const create: (
  value: string | number | BigNumber
) => BigNumber = value => {
  try {
    return new BigNumber(value)
  } catch (error) {
    // Sometimes in production this fails. We want to recover from it.
    // tslint:disable-next-line - Disables all rules for the following line
    console.error(error)
    return toWei(new BigNumber('-314'))
  }
}

export const toString: (value: BigNumber) => string = (value: BigNumber) =>
  value.toString(10)

export const multipliedBy = R.curry(
  (value1: BigNumber, value2: BigNumber): BigNumber =>
    create(value2).multipliedBy(create(value1))
)

export const dividedBy = R.curry(
  (value1: BigNumber, value2: BigNumber): BigNumber =>
    create(value2).div(create(value1))
)

export const fromWei: (value: BigNumber) => BigNumber = (value: BigNumber) =>
  create(Web3.utils.fromWei(value.toString(10), 'ether'))

export const toWei: (value: BigNumber) => BigNumber = (value: BigNumber) =>
  create(Web3.utils.toWei(value.toString(10), 'ether'))

export const subtract = R.curry(
  (num1: BigNumber, num2: BigNumber): BigNumber => num2.minus(num1)
)

export const gt = R.curry(
  (num1: BigNumber, num2: BigNumber): boolean => num2.gt(num1)
)
