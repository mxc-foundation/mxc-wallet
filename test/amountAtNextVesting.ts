const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
declare var web3: Web3
import BluebirdPromise from 'bluebird'
import { readTimeFromChain } from '../src/utils/blockchain'
import * as FnBigNumber from '../src/utils/fnBignumber'
import { timeTravel } from './tools/blockchain'
import { assert } from './tools/chai'
import { getAmountAtNextVesting } from './tools/getAmountAtNextVesting'
import { getTimeToNextVestingOnKovan } from './tools/getTimeLeftToNextVesting'

const CASES = [
  {
    startToCliff: 0,
    startToEnd: 1,
    subcases: [{ timeJump: 0 }],
  },
  {
    startToCliff: 15,
    startToEnd: 307,
    subcases: [
      { timeJump: 0 },
      { timeJump: 123 },
      { timeJump: 183 },
      { timeJump: 303, shouldFail: true },
      { timeJump: 400, shouldFail: true },
    ],
  },
  {
    startToCliff: 182727171,
    startToEnd: 182751471,
    subcases: [
      { timeJump: 0 },
      { timeJump: 182751471, shouldFail: true },
      { timeJump: 182727171 },
    ],
  },
]

contract(
  'Test amount to redeem at next vesting event against the contract on the blockchain.',
  ([deployer, user]) => {
    it('Should correctly predict the amount of and time until next vesting.', async () => {
      await BluebirdPromise.mapSeries(
        CASES,
        async ({ startToCliff, startToEnd, subcases }) => {
          await BluebirdPromise.mapSeries(
            subcases,
            async ({ timeJump, shouldFail }) => {
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
              if (timeJump) {
                await timeTravel(timeJump, web3)
                try {
                  await token.redeemVestableToken(user)
                  // tslint:disable-next-line
                } catch (error) {}
              }

              const balanceBeforeRedemption = await token.balanceOf(user)
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

              if (shouldFail) {
                return assert.equal(timeToNextVesting, -1)
              }

              await timeTravel(timeToNextVesting, web3)
              await token.redeemVestableToken(user)

              const balance = await token.balanceOf(user)

              assert.equal(
                balance.sub(balanceBeforeRedemption).toString(),
                amountAtNextVesting.toString()
              )
            }
          )
        }
      )
    })
  }
)
