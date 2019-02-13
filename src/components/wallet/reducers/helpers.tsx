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
      'https://kovan.etherscan.io/token/0xaed023ec19031e1004304ea7ef36852a87db5f67?a='
    ),
  ],
])
