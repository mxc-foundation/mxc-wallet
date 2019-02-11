import Web3 from 'web3'
import {
  CLIFF_PERIODS,
  GRANTED_TOKENS,
  USERS,
  VESTING_PERIODS
} from '../config'
const MXCToken = artifacts.require('./MXCToken.sol')
const ONE_MILLION_TOKENS = Web3.utils.toWei('1000000', 'ether')

module.exports = function migration(deployer) {
  deployer.then(async () => {
    const token = await deployer.deploy(MXCToken)

    await Promise.all(
      USERS.map(user =>
        token.grantTokenStartNow(
          user,
          GRANTED_TOKENS,
          CLIFF_PERIODS,
          VESTING_PERIODS
        )
      ).concat(USERS.map(user => token.transfer(user, ONE_MILLION_TOKENS)))
    )
  })
}
