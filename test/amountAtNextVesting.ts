const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
declare var web3: Web3
import BluebirdPromise from 'bluebird'
import { readTimeFromChain } from '../src/utils/blockchain'
import * as FnBigNumber from '../src/utils/fnBignumber'
import { getAmountAtNextVesting } from '../src/utils/getAmountAtNextVesting'
import { timeTravel } from './tools/blockchain'
import { assert } from './tools/chai'
import { getTimeToNextVestingOnKovan } from './tools/getTimeLeftToNextVesting'

const CASES = [
  {
    startToCliff: 0,
    startToEnd: 1,
    timeJumps: [0],
  },
  {
    startToCliff: 15,
    startToEnd: 307,
    timeJumps: [0, 123, 183, 303, 400],
  },
  {
    startToCliff: 182727171,
    startToEnd: 182751471,
    timeJumps: [0, 182751471, 182727171],
  },
]

contract(
  'Test amount to redeem at next vesting event against the contract on the blockchain.',
  ([deployer, user]) => {
    it('Should correctly predict the time to next vesting.', async () => {
      await BluebirdPromise.mapSeries(
        CASES,
        async ({ startToCliff, startToEnd, timeJumps }) => {
          await BluebirdPromise.mapSeries(timeJumps, async timeJump => {
            const token = await MXCToken.new({ from: deployer })
            const TOTAL_AMOUNT = '100000000000000'
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

            await timeTravel(timeJump, web3)
            try {
              await token.redeemVestableToken(user)
              // tslint:disable-next-line
            } catch (error) {}

            const amountAtNextVesting = await getAmountAtNextVesting(
              web3,
              token.address,
              user
            )

            const timeToNextVesting = await getTimeToNextVestingOnKovan(
              web3,
              token.address,
              user
            )

            timeTravel(timeToNextVesting, web3)
            try {
              await token.redeemVestableToken(user)
            } catch (error) {
              console.log(startToCliff)
              console.log(startToEnd)
              console.log(timeJump)
              console.log(timeToNextVesting)
              throw new Error(`Failed to redeem tokens when promised.`)
            }

            const balance = await token.balanceOf(user)

            assert.equal(balance, amountAtNextVesting.toString())
          })
        }
      )
    })
  }
)
