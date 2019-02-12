import Web3 from 'web3'

export const USERS = [
  '0xfd36fED4892d914036e80C6eED3AA10769833F97',
  '0xaeA4BF43F98EC263B578DB21C2422348B7cf4e38',
]
export const CLIFF_PERIODS = 1
export const VESTING_PERIODS = 100000
export const GRANTED_TOKENS = Web3.utils.toWei('1000000', 'ether')
export const PERIOD_LENGTH_ON_KOVAN = 60
