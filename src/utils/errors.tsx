export const ERROR_UNABLE_TO_BUY_TOKENS = "Unable to buy tokens!"
export const ERROR_RECEPIENT_ADDRESS_NOT_SET = "Recipient address not set!"
export const ERROR_RECEPIENT_TOKEN_AMOUNT_NOT_SET = "Token amount not set!"
export const ERROR_NO_ADDRESS_AVAILABLE = "No address available."
export const ERROR_METAMASK_NOT_INSTALLED = "Metamask not installed."
export const ERROR_UNFORSEEN_CASE_WHEN_HANDLING_BALANCE_DATA =
  "Unforseen case when handling balance data."
export const ERROR_NETWORK_IS_NOT_SUPPORTED = "Network is not supported!"

export const createUnableToBuyTokensError = () => {
  return new Error(ERROR_UNABLE_TO_BUY_TOKENS)
}
export const createRecepientAddressNotSetError = () => {
  return new Error(ERROR_RECEPIENT_ADDRESS_NOT_SET)
}
export const createRecepientTokenAmountNotSetError = () => {
  return new Error(ERROR_RECEPIENT_TOKEN_AMOUNT_NOT_SET)
}
export const createNoAddressAvailableError = () => {
  return new Error(ERROR_NO_ADDRESS_AVAILABLE)
}
export const createMetamaskNotInstalledError = () => {
  return new Error(ERROR_METAMASK_NOT_INSTALLED)
}
export const createUnforseenCaseWhenHandlingBalanceDataError = () => {
  return new Error(ERROR_UNFORSEEN_CASE_WHEN_HANDLING_BALANCE_DATA)
}
export const createNetworkIsNotSupportedError = () => {
  return new Error(ERROR_NETWORK_IS_NOT_SUPPORTED)
}
