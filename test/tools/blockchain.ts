import pify from 'pify'
import Web3 from 'web3'

export const mineBlock = async (web3: Web3) =>
  await pify(web3.currentProvider.send)({
    id: new Date().getTime(),
    jsonrpc: '2.0',
    method: 'evm_mine',
    params: [],
  })

export const timeTravel = async (seconds: number, web3: Web3) => {
  await pify(web3.currentProvider.send)({
    id: new Date().getTime(),
    jsonrpc: '2.0',
    method: 'evm_increaseTime',
    params: [seconds],
  })
  await mineBlock(web3)
}
