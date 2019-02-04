import { BigNumber } from "bignumber.js"
import { createStandardAction } from "typesafe-actions"

export const setAddress = createStandardAction("wallet/SET_ADDRESS")<string>()

export const setEtherBalance = createStandardAction("wallet/SET_ETHER_BALANCE")<
  BigNumber
>()

export const setNetwork = createStandardAction("wallet/SET_NETWORK")<string>()
