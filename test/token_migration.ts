const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
import { TOTAL_SUPPLY, USERS } from '../config'
import * as FnBigNumber from '../src/utils/fnBignumber'
import { assert } from './tools/chai'

const HALF_TOTAL_SUPPLY = Web3.utils.toWei(
  (TOTAL_SUPPLY / 2).toString(),
  'ether'
)

contract('MXC Migration', ([deployer]) => {
  it('Should have the right balance', async () => {
    const token = await MXCToken.deployed()
    const balanceUser0 = await token.balanceOf.call(USERS[0])
    const balanceUser1 = await token.balanceOf.call(USERS[1])
    const halfSupply = FnBigNumber.create(HALF_TOTAL_SUPPLY)
    assert.deepEqual(FnBigNumber.create(balanceUser0), halfSupply)
    assert.deepEqual(FnBigNumber.create(balanceUser1), halfSupply)
  })
})
