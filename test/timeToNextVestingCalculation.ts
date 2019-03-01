const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
declare var web3: Web3
import BluebirdPromise from 'bluebird'
import { readTimeFromChain } from '../src/utils/blockchain'
import { timeTravel } from './tools/blockchain'
import { assert } from './tools/chai'
import { getTimeToNextVestingOnKovan } from './tools/getTimeLeftToNextVesting'
const CASES = [
  {
    startToCliff: 0,
    startToEnd: 1,
  },
  {
    startToCliff: 15,
    startToEnd: 307,
  },
]

contract(
  'Test time to next vesting calculation against the contract on the blockchain.',
  ([deployer, user]) => {
    it('Should correctly predict the time to next vesting.', async () => {
      await BluebirdPromise.mapSeries(
        CASES,
        async ({ startToCliff, startToEnd }) => {
          const token = await MXCToken.new({ from: deployer })
          const TOTAL_AMOUNT = 100
          const NOW = await readTimeFromChain(web3)

          await token.grantToken(
            user,
            TOTAL_AMOUNT,
            NOW,
            NOW + startToCliff,
            NOW + startToEnd,
            {
              from: deployer,
            }
          )

          const timeToNextVesting = await getTimeToNextVestingOnKovan(
            web3,
            token.address,
            user
          )
          if (timeToNextVesting) {
            await timeTravel(timeToNextVesting - 1, web3)
          }

          await assert.isRejected(token.redeemVestableToken(user))

          timeTravel(1, web3)

          await assert.isFulfilled(token.redeemVestableToken(user))
        }
      )
    })
  }
)
