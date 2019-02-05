import BigNumber from 'bn.js'
import Web3 from 'web3'
import { isNetworkSupported } from '../components/errors/networkList'
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

export interface Blockchain {
  getAddress(): Promise<string>
  checkNetwork(): Promise<void>
  getEtherBalance(): Promise<BigNumber>
  getTokenBalance(): Promise<BigNumber>
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
    const balanceString = await web3.eth.getBalance(address)
    return FnBigNumber.create(balanceString)
  }
  const getTokenBalance = async () => {
    const address = await getAddress()
    const token = await createToken(web3)
    const balanceString = await token.methods.balanceOf(address).call()
    return FnBigNumber.create(balanceString)
  }
  return {
    checkNetwork,
    getAddress,
    getEtherBalance,
    getNetwork: web3.eth.net.getId,
    getTokenBalance,
  }
}
export default createBlockchain
