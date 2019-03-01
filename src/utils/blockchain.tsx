import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { isNetworkSupported } from '../components/errors/networkList'
import { Lock } from '../components/wallet/reducers'
import tokenJSON from '../truffle-build/contracts/MXCToken.json'
import TokenJson from '../truffle-build/contracts/MXCToken.json'
import { MXCToken } from '../typechain/contracts/MXCToken'
import * as errors from '../utils/errors'
import * as FnBigNumber from '../utils/fnBignumber'

export type SendTokens = (amount: BigNumber, recipient: string) => Promise<void>
export type BuyTokens = (amount: BigNumber) => Promise<void>

const tokenAddress = (network: number) => {
  if (network === 1) {
    return '0x5Ca381bBfb58f0092df149bD3D243b08B9a8386e'
  }
  return (TokenJson as any).networks[network].address
}

const createToken = async (web3: Web3): Promise<MXCToken> => {
  const network = await web3.eth.net.getId()

  return (new web3.eth.Contract(
    TokenJson.abi as any,
    tokenAddress(network)
  ) as unknown) as MXCToken
}

export const createMXCToken = (web3: Web3, address: string): MXCToken =>
  (new web3.eth.Contract(tokenJSON.abi as any, address) as unknown) as MXCToken

export const readTimeFromChain = async (web3: Web3): Promise<number> => {
  const block = await web3.eth.getBlock('latest')
  return block.timestamp
}

export interface Blockchain {
  getAddress(): Promise<string>
  checkNetwork(): Promise<void>
  getEtherBalance(): Promise<BigNumber>
  getTokenBalance(): Promise<BigNumber>
  getNetwork(): Promise<number>
  redeemTokens(): Promise<void>
  grantTokens(
    recipient: string,
    amount: BigNumber,
    cliffPeriods: number,
    vestingPeriods: number
  ): Promise<void>
  getLock(): Promise<Lock>
  getNow(): Promise<number>
  sendTokens(amount: BigNumber, recipient: string): Promise<void>
  sendEther(amount: BigNumber, recipient: string): Promise<void>
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

  const getNow = async () => 222 // readTimeFromChain(web3)

  const grantTokens = async (
    recipient: string,
    amount: BigNumber,
    cliffPeriods: number,
    vestingPeriods: number
  ) => {
    const token = await createToken(web3)
    const address = await getAddress()
    await token.methods
      .grantTokenStartNow(
        recipient,
        FnBigNumber.toString(amount),
        cliffPeriods,
        vestingPeriods
      )
      .send({ from: address })
  }
  const getEtherBalance = async () => {
    const address = await getAddress()
    const balanceString = await web3.eth.getBalance(address)
    return FnBigNumber.create(balanceString)
  }
  const getTokenBalance = async () => {
    const address = await getAddress()
    const token = await createToken(web3)
    const balanceString = await token.methods.balanceOf(address).call()
    return FnBigNumber.create(balanceString)
  }

  const getLock = async () => {
    /*
    const address = await getAddress()
    const token = await createToken(web3)
    const {
      amount: totalAmount,
      vestedAmount,
      start,
      cliff,
      vesting: end,
    } = await token.methods.vestBalanceOf(address).call()*/
    return {
      cliff: 83,
      end: 234,
      start: 23,
      totalAmount: FnBigNumber.toWei(FnBigNumber.create('200')),
      vestedAmount: FnBigNumber.toWei(FnBigNumber.create('200')),
    }
  }

  const redeemTokens = async () => {
    const token = await createToken(web3)
    const address = await getAddress()
    await token.methods.redeemVestableToken(address).send({ from: address })
  }

  const sendTokens = async (amount: BigNumber, recipient: string) => {
    const token = await createToken(web3)
    const address = await getAddress()
    await token.methods
      .transfer(recipient, FnBigNumber.toString(amount))
      .send({ from: address })
  }

  const sendEther = async (amount: BigNumber, recipient: string) => {
    const address = await getAddress()
    await web3.eth.sendTransaction({
      from: address,
      to: recipient,
      value: FnBigNumber.toString(amount),
    })
  }

  return {
    checkNetwork,
    getAddress,
    getEtherBalance,
    getLock,
    getNetwork: web3.eth.net.getId,
    getNow,
    getTokenBalance,
    grantTokens,
    redeemTokens,
    sendEther,
    sendTokens,
  }
}
export default createBlockchain
