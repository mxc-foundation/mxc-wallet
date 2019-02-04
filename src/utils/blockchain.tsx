import { BigNumber } from "bignumber.js"
import Web3 from "web3"
import { isNetworkSupported } from "../components/errors/networkList"
import * as errors from "../utils/errors"
import * as FnBigNumber from "../utils/fnBignumber"

export type SendTokens = (amount: BigNumber, recipient: string) => Promise<void>
export type BuyTokens = (amount: BigNumber) => Promise<void>

export interface Blockchain {
  getAddress(): Promise<string>
  checkNetwork(): Promise<void>
  getEtherBalance(): Promise<BigNumber>
  getNetwork(): Promise<number>
}

const createBlockchain = (web3: Web3): Blockchain => {
  const checkNetwork = async () => {
    const networkId = await web3.eth.net.getId()
    if (!isNetworkSupported(networkId)) {
      throw errors.createNetworkIsNotSupportedError()
    }
  }

  const getAddress = async () => {
    const accounts = await web3.eth.getAccounts()
    const address = accounts[0]
    if (!address) {
      throw errors.createNoAddressAvailableError()
    }
    return address
  }

  const getEtherBalance = async () => {
    const address = await getAddress()
    return FnBigNumber.create(await web3.eth.getBalance(address))
  }
  return {
    checkNetwork,
    getAddress,
    getNetwork: web3.eth.net.getId,
    getEtherBalance
  }
}
export default createBlockchain
