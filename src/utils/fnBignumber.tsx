import { BigNumber } from "bignumber.js"
import * as R from "ramda"
import Web3 from "web3"

const web3 = new Web3("http://localhost:8545")

export const create: (
  value: string | number | BigNumber
) => BigNumber = R.constructN(1, BigNumber as any)

export const toNumber: (value: BigNumber) => number = R.pipe(
  create, // IMPORTANT: LEAVE THIS IN! In production a BigNumber with value 0 will be a number with value 0. We need to add this cast.
  R.invoker(0, "toNumber")
)

export const toString: (value: BigNumber) => string = R.invoker(0, "toString")

export const multiply = (value1: BigNumber, value2: BigNumber): BigNumber =>
  create(value1).multipliedBy(create(value2))

export const divide = (value1: BigNumber, value2: BigNumber): BigNumber =>
  create(value1).dividedBy(create(value2))

export const fromWei: (value: BigNumber) => BigNumber = (value: BigNumber) =>
  create(web3.utils.fromWei(value.toString(), "ether"))
