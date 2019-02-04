import { any, filter, find, prop, propEq } from "ramda"
import * as R from "ramda"
export interface Network {
  id: string | null
  name: string
  isSupported: boolean
}

export type NetworkList = ReadonlyArray<Network>

export const networkList: NetworkList = Object.freeze([
  { id: "1", name: "Main Ethereum Network", isSupported: true },
  { id: "3", name: "Ropsten Test Network", isSupported: false },
  { id: "4", name: "Rinkeby Test Network", isSupported: false },
  { id: "42", name: "Kovan Test Network", isSupported: true }
])

export const idToNetwork = (id: string): Network =>
  R.find(R.propEq("id", id))(networkList)

export const whiteList: NetworkList = Object.freeze(
  filter(prop("isSupported"), networkList)
)

export const isNetworkSupported = (networkId: number | null): boolean =>
  R.pipe(
    filter(prop("isSupported")) as (networkList: NetworkList) => NetworkList,
    any(propEq("id", networkId))
  )(networkList)

export const getNetworkName = (networkId: string | null): string =>
  R.pipe(
    find(propEq("id", networkId)) as (networkList: NetworkList) => Network,
    prop("name")
  )(networkList)
