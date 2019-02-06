import Web3 from 'web3'
import { CLIFF_MONTHS, GRANTED_TOKENS, USERS, VESTING_MONTHS } from '../config'
const MXCToken = artifacts.require('./MXCToken.sol')
const ONE_THOUSAND_TOKENS = Web3.utils.toWei('1000', 'ether')

module.exports = function migration(deployer) {
  deployer.then(async () => {
    const token = await deployer.deploy(MXCToken)

    await Promise.all(
      USERS.map(user =>
        token.grantTokenStartNow(
          user,
          GRANTED_TOKENS,
          CLIFF_MONTHS,
          VESTING_MONTHS
        )
      ).concat(USERS.map(user => token.transfer(user, ONE_THOUSAND_TOKENS)))
    )
  })
}
