import Web3 from 'web3'
import * as errors from './errors'

declare var web3: Web3 | undefined

const createWeb3 = () => {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    (web3.currentProvider as any).enable()
    return new Web3(web3.currentProvider)
  }
  throw errors.createMetamaskNotInstalledError()
}

export default createWeb3
