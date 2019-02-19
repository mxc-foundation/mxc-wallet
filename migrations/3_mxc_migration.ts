import Web3 from 'web3'
import { TOTAL_SUPPLY, USERS } from '../config'

const MXCToken = artifacts.require('./MXCToken.sol')
const HALF_TOTAL_SUPPLY = Web3.utils.toWei(
  (TOTAL_SUPPLY / 2).toString(),
  'ether'
)

module.exports = function migration(deployer) {
  deployer.then(async () => {
    const token = await deployer.deploy(MXCToken)

    await Promise.all([
      token.transfer(USERS[0], HALF_TOTAL_SUPPLY),
      token.transfer(USERS[1], HALF_TOTAL_SUPPLY),
    ])
  })
}
