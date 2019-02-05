import BigNumber from 'bn.js'
import * as R from 'ramda'
import Web3 from 'web3'

const web3 = new Web3('http://localhost:8545')

export const create: (
  value: string | number | BigNumber
) => BigNumber = R.constructN(1, BigNumber as any)

export const toString: (value: BigNumber) => string = (value: BigNumber) =>
  value.toString(10)

export const multiply = (value1: BigNumber, value2: BigNumber): BigNumber =>
  create(value1).mul(create(value2))

export const divide = (value1: BigNumber, value2: BigNumber): BigNumber =>
  create(value1).div(create(value2))

export const fromWei: (value: BigNumber) => string = (value: BigNumber) =>
  web3.utils.fromWei(value.toString(10), 'ether')
