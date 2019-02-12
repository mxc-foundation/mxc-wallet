declare type _contractTest = (accounts: string[]) => void
declare function contract(name: string, test: _contractTest): void
declare function it(name: string, test: _contractTest): void

declare interface TransactionMeta {
  from: string
}

declare interface Contract<T> {
  address: any
  'new'(...args: any[]): Promise<T>
  deployed(): Promise<T>
  at(address: string): T
  transferOwnership(...args: any[]): Promise<T>
  owner(): Promise<any>
  wallet(): Promise<any>
}

interface Artifacts {
  require(name: './MXCToken.sol' | './Migrations.sol'): Contract<any>
}

declare var artifacts: Artifacts
