import * as R from 'ramda'

export const etherscanBasePathForNetwork: (
  networkId: number
) => string = R.cond([
  [
    R.equals(1),
    R.always(
      'https://etherscan.io/token/0x5ca381bbfb58f0092df149bd3d243b08b9a8386e?a='
    ),
  ],
  [
    R.T,
    R.always(
      'https://kovan.etherscan.io/token/0x27dA64984b8b18e8B807BB15205534F45bfE6955?a='
    ),
  ],
])

export const etherscanOriginForNetwork: (networkId: number) => string = R.cond([
  [R.equals(1), R.always('https://etherscan.io/')],
  [R.T, R.always('https://kovan.etherscan.io/')],
])
