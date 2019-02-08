import Web3 from 'web3'
import { readTimeFromChain } from './../src/utils/blockchain'
import { mineBlock, timeTravel } from './tools/blockchain'
declare var web3: Web3
import { assert } from './tools/chai'

contract('Time Travel tools', () => {
  it('The time on the blockchain should be forwarded', async () => {
    await mineBlock(web3)
    const timeBeforeTimeTravel = await readTimeFromChain(web3)
    await timeTravel(20, web3)
    const timeAfterTimeTravel = await readTimeFromChain(web3)
    assert.isTrue(
      Math.abs(timeAfterTimeTravel - timeBeforeTimeTravel - 20) <= 1
    )
  })
})
