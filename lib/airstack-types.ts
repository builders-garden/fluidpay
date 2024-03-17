export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Address: { input: any; output: any; }
  DateRange: { input: any; output: any; }
  Identity: { input: any; output: any; }
  IntString: { input: any; output: any; }
  Map: { input: any; output: any; }
  Range: { input: any; output: any; }
  Time: { input: any; output: any; }
  TimeRange: { input: any; output: any; }
};

/** Represents on-chain smart contract account */
export type Account = {
  /** Nested query - on-chain wallet related information, including address, domains, social profile, other token balances, and transfer history */
  address: Wallet;
  /** Blockchain where account is created */
  blockchain: Maybe<TokenBlockchain>;
  /** Block number of the account creation transaction */
  createdAtBlockNumber: Maybe<Scalars['Int']['output']>;
  /** Block timestamp of the account creation transaction */
  createdAtBlockTimestamp: Maybe<Scalars['Time']['output']>;
  /** Transaction Hash of the account creation transaction */
  creationTransactionHash: Maybe<Scalars['String']['output']>;
  /** Address of deployer */
  deployer: Maybe<Scalars['String']['output']>;
  /** Airstack unique identifier for the account */
  id: Scalars['ID']['output'];
  /** ERC6551 standard : Implementation address of on chain smart contract account */
  implementation: Maybe<Scalars['String']['output']>;
  /** Token NFT associated with erc-6551 */
  nft: Maybe<TokenNft>;
  /** ERC6551 standard : Registry used to deploy smart contract wallet */
  registry: Maybe<Scalars['Address']['output']>;
  /** ERC6551 standard salt for account creation */
  salt: Maybe<Scalars['String']['output']>;
  /** Standard of account-  ERC6551, Safe etc */
  standard: AccountStandard;
  /** ERC6551 standard: Address of ERC721 token */
  tokenAddress: Maybe<Scalars['Address']['output']>;
  /** ERC6551 standard: tokenId of ERC721 token */
  tokenId: Maybe<Scalars['String']['output']>;
  /** Block number of the account updation transaction */
  updatedAtBlockNumber: Maybe<Scalars['Int']['output']>;
  /** Block timestamp of the account updation transaction */
  updatedAtBlockTimestamp: Maybe<Scalars['Time']['output']>;
};

export type AccountFilter = {
  _and: InputMaybe<Array<AccountFilter>>;
  _nor: InputMaybe<Array<AccountFilter>>;
  _or: InputMaybe<Array<AccountFilter>>;
  address: InputMaybe<Identity_Comparator_Exp>;
  createdAtBlockTimestamp: InputMaybe<Time_Comparator_Exp>;
  implementation: InputMaybe<Address_Comparator_Exp>;
  registry: InputMaybe<Address_Comparator_Exp>;
  salt: InputMaybe<String_Eq_Comparator_Exp>;
  standard: InputMaybe<AccountStandard_Comparator_Exp>;
  tokenAddress: InputMaybe<Address_Comparator_Exp>;
  tokenId: InputMaybe<String_Comparator_Exp>;
};

export type AccountOrderBy = {
  createdAtBlockTimestamp: InputMaybe<OrderBy>;
};

export enum AccountStandard {
  Erc6551 = 'ERC6551'
}

export type AccountStandard_Comparator_Exp = {
  _eq: InputMaybe<AccountStandard>;
  _in: InputMaybe<Array<AccountStandard>>;
};

export type AccountsInput = {
  blockchain: TokenBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: InputMaybe<AccountFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<AccountOrderBy>>;
};

export type AccountsNestedInput = {
  blockchain: InputMaybe<TokenBlockchain>;
  filter: InputMaybe<AccountFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<AccountOrderBy>>>;
  showOptimisticAddress: InputMaybe<Scalars['Boolean']['input']>;
};

export type AccountsOutput = {
  Account: Maybe<Array<Account>>;
  pageInfo: Maybe<PageInfo>;
};

export type Address_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Address']['input']>;
  _in: InputMaybe<Array<Scalars['Address']['input']>>;
  _ne: InputMaybe<Scalars['Address']['input']>;
  _nin: InputMaybe<Array<Scalars['Address']['input']>>;
};

export type AnimationUrlVariants = {
  original: Maybe<Scalars['String']['output']>;
};

export enum Audience {
  All = 'all',
  Farcaster = 'farcaster'
}

export type AudioVariants = {
  original: Maybe<Scalars['String']['output']>;
};

export enum Blockchain {
  Ethereum = 'ethereum'
}

export type Boolean_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Boolean']['input']>;
};

export type ConnectedAddress = {
  address: Maybe<Scalars['Address']['output']>;
  blockchain: Maybe<Scalars['String']['output']>;
  chainId: Maybe<Scalars['String']['output']>;
  timestamp: Maybe<Scalars['Time']['output']>;
};

export type ContractMetadata = {
  /** Description of the token, mirrored from the smart contract */
  description: Maybe<Scalars['String']['output']>;
  externalLink: Maybe<Scalars['String']['output']>;
  /** Royalties recipient address, mirrored from the smart contract */
  feeRecipient: Maybe<Scalars['String']['output']>;
  image: Maybe<Scalars['String']['output']>;
  /** Name of the token, mirrored from the smart contract */
  name: Maybe<Scalars['String']['output']>;
  sellerFeeBasisPoints: Maybe<Scalars['Int']['output']>;
};

export type Date_Range_Comparator_Exp = {
  _eq: InputMaybe<Scalars['String']['input']>;
};

export type Domain = {
  /** Avatar of the domain */
  avatar: Maybe<Scalars['String']['output']>;
  /** Blockchain where the NFT sale took place */
  blockchain: Blockchain;
  /** Unique identifier for the blockchain */
  chainId: Maybe<Scalars['String']['output']>;
  /** Block number when the domain was created */
  createdAtBlockNumber: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the domain was created */
  createdAtBlockTimestamp: Maybe<Scalars['Time']['output']>;
  /** DApp name associated with the domain (e.g. ENS) */
  dappName: Maybe<DomainDappName>;
  /** DApp slug (contract version) associated with the domain */
  dappSlug: Maybe<DomainDappSlug>;
  /** Timestamp when the domain registration expires */
  expiryTimestamp: Maybe<Scalars['Time']['output']>;
  /** Domain registration cost in decimals */
  formattedRegistrationCost: Maybe<Scalars['Float']['output']>;
  /** Domain registration cost in native blockchain token in decimals */
  formattedRegistrationCostInNativeToken: Maybe<Scalars['Float']['output']>;
  /** Domain registration cost in USDC in decimals */
  formattedRegistrationCostInUSDC: Maybe<Scalars['Float']['output']>;
  /** Airstack unique identifier for the data point */
  id: Maybe<Scalars['ID']['output']>;
  /** Domain is name wrapped or not */
  isNameWrapped: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if the domain is set to be primary - true or false */
  isPrimary: Maybe<Scalars['Boolean']['output']>;
  /** Airstack unique domain hash */
  labelHash: Maybe<Scalars['String']['output']>;
  /** Domain name without the domain ending, e.g. vitalik instead of vitalik.eth */
  labelName: Maybe<Scalars['String']['output']>;
  /** Block number when the domain was last updated */
  lastUpdatedBlockNumber: Maybe<Scalars['Int']['output']>;
  /** Timestamp when the domain was last updated */
  lastUpdatedBlockTimestamp: Maybe<Scalars['Time']['output']>;
  /** Manager of Domain */
  manager: Scalars['Address']['output'];
  /** Manager wallet related information, including address, domains, social profile, other token balances, and transfer history */
  managerDetails: Maybe<Wallet>;
  /** Multichain associated with the domain */
  multiChainAddresses: Maybe<Array<DomainMultiChainAddress>>;
  /** Full domain name, e.g. vitalik.eth */
  name: Maybe<Scalars['String']['output']>;
  /** Owner of token associated with the domain */
  owner: Scalars['Address']['output'];
  /** Owner wallet related information, including address, domains, social profile, other token balances, and transfer history */
  ownerDetails: Maybe<Wallet>;
  /** Parent domain name, if the entity is a subdomain */
  parent: Maybe<Scalars['String']['output']>;
  /** Nested query - can retrieve payment token data (name, symbol, etc.) */
  paymentToken: Maybe<Token>;
  /** payment amount in blockchain native token for the domain */
  paymentTokenCostInNativeToken: Maybe<Scalars['Float']['output']>;
  /** payment amount in USDC for the domain */
  paymentTokenCostInUSDC: Maybe<Scalars['Float']['output']>;
  /** Domain registration cost */
  registrationCost: Maybe<Scalars['String']['output']>;
  /** Domain registration cost in blockchain native token */
  registrationCostInNativeToken: Maybe<Scalars['String']['output']>;
  /** Domain registration cost in USDC */
  registrationCostInUSDC: Maybe<Scalars['String']['output']>;
  /** Blockchain address to which the domain is resolved */
  resolvedAddress: Maybe<Scalars['Address']['output']>;
  /** Nested query - on-chain resolvedAddress wallet related information, including address, domains, social profile, other token balances, and transfer history */
  resolvedAddressDetails: Maybe<Wallet>;
  /** Resolver address associated with Domain */
  resolverAddress: Maybe<Scalars['Address']['output']>;
  /** Count of subdomains linked to the domain */
  subDomainCount: Maybe<Scalars['Int']['output']>;
  /** Nested query allowing to retrieve subdomain information associated with the domain */
  subDomains: Maybe<Array<Maybe<Domain>>>;
  /** Texts associated with the domain */
  texts: Maybe<Array<DomainTexts>>;
  /** Token Address associated with the domain, if applicable */
  tokenAddress: Scalars['Address']['output'];
  /** Domain Token ID associated with the domain, if applicable */
  tokenId: Maybe<Scalars['String']['output']>;
  /** Token nft associated with the domain, if applicable */
  tokenNft: Maybe<TokenNft>;
  /** Time-to-live value for the domain */
  ttl: Maybe<Scalars['String']['output']>;
};


export type DomainSubDomainsArgs = {
  input: InputMaybe<DomainsNestedInput>;
};

export enum DomainDappName {
  Ens = 'ens'
}

export type DomainDappName_Comparator_Exp = {
  _eq: InputMaybe<DomainDappName>;
  _in: InputMaybe<Array<DomainDappName>>;
};

export enum DomainDappSlug {
  EnsV1 = 'ens_v1'
}

export type DomainDappSlug_Comparator_Exp = {
  _eq: InputMaybe<DomainDappSlug>;
  _in: InputMaybe<Array<DomainDappSlug>>;
};

export type DomainFilter = {
  _and: InputMaybe<Array<DomainFilter>>;
  _nor: InputMaybe<Array<DomainFilter>>;
  _or: InputMaybe<Array<DomainFilter>>;
  isPrimary: InputMaybe<Boolean_Comparator_Exp>;
  name: InputMaybe<String_Comparator_Exp>;
  owner: InputMaybe<Identity_Comparator_Exp>;
  resolvedAddress: InputMaybe<Address_Comparator_Exp>;
};

export type DomainMultiChainAddress = {
  /** address */
  address: Maybe<Scalars['String']['output']>;
  /** symbol according to SLIP-0044 */
  symbol: Maybe<Scalars['String']['output']>;
};

export type DomainOrderBy = {
  createdAtBlockTimestamp: InputMaybe<OrderBy>;
  expiryTimestamp: InputMaybe<OrderBy>;
  lastUpdatedBlockTimestamp: InputMaybe<OrderBy>;
};

export type DomainTexts = {
  /** key of the text */
  key: Maybe<Scalars['String']['output']>;
  /** value of the text */
  value: Maybe<Scalars['String']['output']>;
};

export type DomainsInput = {
  blockchain: Blockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: DomainFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<DomainOrderBy>>;
};

export type DomainsNestedInput = {
  blockchain: InputMaybe<Blockchain>;
  filter: InputMaybe<DomainFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<DomainOrderBy>>>;
};

export type DomainsOutput = {
  Domain: Maybe<Array<Domain>>;
  pageInfo: Maybe<PageInfo>;
};

export enum EveryBlockchain {
  All = 'ALL'
}

export type FarcasterChannel = {
  channelId: Scalars['String']['output'];
  createdAtTimestamp: Scalars['Time']['output'];
  dappName: Scalars['String']['output'];
  dappSlug: Scalars['String']['output'];
  description: Scalars['String']['output'];
  /** Airstack unique identifier for the data point */
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  leadIds: Maybe<Array<Scalars['String']['output']>>;
  leadProfiles: Maybe<Array<Social>>;
  name: Scalars['String']['output'];
  participants: Maybe<Array<FarcasterChannelParticipant>>;
  url: Scalars['String']['output'];
};


export type FarcasterChannelLeadProfilesArgs = {
  input: InputMaybe<SocialsNestedInput>;
};


export type FarcasterChannelParticipantsArgs = {
  input: InputMaybe<FarcasterChannelParticipantNestedInput>;
};

export enum FarcasterChannelActionType {
  Cast = 'cast',
  Reply = 'reply'
}

export type FarcasterChannelActionType_Comparator_Exp = {
  _eq: InputMaybe<FarcasterChannelActionType>;
  _in: InputMaybe<Array<FarcasterChannelActionType>>;
};

export type FarcasterChannelFilter = {
  _and: InputMaybe<Array<FarcasterChannelFilter>>;
  _nor: InputMaybe<Array<FarcasterChannelFilter>>;
  _or: InputMaybe<Array<FarcasterChannelFilter>>;
  channelId: InputMaybe<String_Comparator_Exp>;
  createdAtTimestamp: InputMaybe<Time_Comparator_Exp>;
  leadId: InputMaybe<String_Comparator_Exp>;
  leadIdentity: InputMaybe<Identity_Comparator_Exp>;
  name: InputMaybe<Regex_String_Comparator_Exp>;
};

export type FarcasterChannelNestedInput = {
  blockchain: InputMaybe<EveryBlockchain>;
  filter: InputMaybe<FarcasterChannelFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<FarcasterChannelOrderBy>>>;
};

export type FarcasterChannelOrderBy = {
  createdAtTimestamp: InputMaybe<OrderBy>;
};

export type FarcasterChannelParticipant = {
  channel: FarcasterChannel;
  channelActions: Maybe<Array<FarcasterChannelActionType>>;
  channelId: Scalars['String']['output'];
  channelName: Scalars['String']['output'];
  dappName: Scalars['String']['output'];
  dappSlug: Scalars['String']['output'];
  /** Airstack unique identifier for the data point */
  id: Maybe<Scalars['ID']['output']>;
  lastActionTimestamp: Scalars['Time']['output'];
  lastCastedTimestamp: Maybe<Scalars['Time']['output']>;
  lastRepliedTimestamp: Maybe<Scalars['Time']['output']>;
  participant: Maybe<Social>;
  participantId: Scalars['String']['output'];
};


export type FarcasterChannelParticipantChannelArgs = {
  input: InputMaybe<FarcasterChannelNestedInput>;
};


export type FarcasterChannelParticipantParticipantArgs = {
  input: InputMaybe<SocialsNestedInput>;
};

export type FarcasterChannelParticipantFilter = {
  _and: InputMaybe<Array<FarcasterChannelParticipantFilter>>;
  _nor: InputMaybe<Array<FarcasterChannelParticipantFilter>>;
  _or: InputMaybe<Array<FarcasterChannelParticipantFilter>>;
  channelActions: InputMaybe<FarcasterChannelActionType_Comparator_Exp>;
  channelId: InputMaybe<String_Comparator_Exp>;
  channelName: InputMaybe<Regex_String_Comparator_Exp>;
  lastActionTimestamp: InputMaybe<Time_Comparator_Exp>;
  participant: InputMaybe<Identity_Comparator_Exp>;
};

export type FarcasterChannelParticipantNestedInput = {
  blockchain: InputMaybe<EveryBlockchain>;
  filter: InputMaybe<FarcasterChannelParticipantFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<FarcasterChannelParticipantOrderBy>>>;
};

export type FarcasterChannelParticipantOrderBy = {
  lastActionTimestamp: InputMaybe<OrderBy>;
};

export type FarcasterChannelParticipantsInput = {
  blockchain: EveryBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: FarcasterChannelParticipantFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<FarcasterChannelParticipantOrderBy>>;
};

export type FarcasterChannelParticipantsOutput = {
  FarcasterChannelParticipant: Maybe<Array<FarcasterChannelParticipant>>;
  pageInfo: Maybe<PageInfo>;
};

export type FarcasterChannelsInput = {
  blockchain: EveryBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: InputMaybe<FarcasterChannelFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<FarcasterChannelOrderBy>>;
};

export type FarcasterChannelsOutput = {
  FarcasterChannel: Maybe<Array<FarcasterChannel>>;
  pageInfo: Maybe<PageInfo>;
};

export type Float_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Float']['input']>;
  _gt: InputMaybe<Scalars['Float']['input']>;
  _gte: InputMaybe<Scalars['Float']['input']>;
  _in: InputMaybe<Array<Scalars['Float']['input']>>;
  _lt: InputMaybe<Scalars['Float']['input']>;
  _lte: InputMaybe<Scalars['Float']['input']>;
  _ne: InputMaybe<Scalars['Float']['input']>;
  _nin: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type Identity_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Identity']['input']>;
  _in: InputMaybe<Array<Scalars['Identity']['input']>>;
};

export type ImageSizes = {
  extraSmall: Maybe<Scalars['String']['output']>;
  large: Maybe<Scalars['String']['output']>;
  medium: Maybe<Scalars['String']['output']>;
  original: Maybe<Scalars['String']['output']>;
  small: Maybe<Scalars['String']['output']>;
};

export type Int_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Int']['input']>;
  _gt: InputMaybe<Scalars['Int']['input']>;
  _gte: InputMaybe<Scalars['Int']['input']>;
  _in: InputMaybe<Array<Scalars['Int']['input']>>;
  _lt: InputMaybe<Scalars['Int']['input']>;
  _lte: InputMaybe<Scalars['Int']['input']>;
  _ne: InputMaybe<Scalars['Int']['input']>;
  _nin: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Int_String_Comparator_Exp = {
  _eq: InputMaybe<Scalars['String']['input']>;
  _gt: InputMaybe<Scalars['String']['input']>;
  _gte: InputMaybe<Scalars['String']['input']>;
  _in: InputMaybe<Array<Scalars['String']['input']>>;
  _lt: InputMaybe<Scalars['String']['input']>;
  _lte: InputMaybe<Scalars['String']['input']>;
  _ne: InputMaybe<Scalars['String']['input']>;
  _nin: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LogoSizes = {
  external: Maybe<Scalars['String']['output']>;
  large: Maybe<Scalars['String']['output']>;
  medium: Maybe<Scalars['String']['output']>;
  original: Maybe<Scalars['String']['output']>;
  small: Maybe<Scalars['String']['output']>;
};

export type Media = {
  animation_url: Maybe<AnimationUrlVariants>;
  audio: Maybe<AudioVariants>;
  image: Maybe<ImageSizes>;
  json: Maybe<Scalars['String']['output']>;
  video: Maybe<VideoVariants>;
};

export type NftAttribute = {
  displayType: Maybe<Scalars['String']['output']>;
  maxValue: Maybe<Scalars['String']['output']>;
  /** NFT attribute type as defined in the smart contract, e.g. background */
  trait_type: Maybe<Scalars['String']['output']>;
  /** NFT attribute value as defined in the smart contract, e.g. blue */
  value: Maybe<Scalars['String']['output']>;
};

export type NftAttributeFilter = {
  _and: InputMaybe<Array<NftAttributeFilter>>;
  _nor: InputMaybe<Array<NftAttributeFilter>>;
  _or: InputMaybe<Array<NftAttributeFilter>>;
  trait_type: InputMaybe<String_Comparator_Exp>;
  value: InputMaybe<String_Comparator_Exp>;
};

export type NftAttributesInput = {
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: NftAttributeFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
};

export type NftAttributesOutput = {
  NftAttribute: Maybe<Array<NftAttribute>>;
  pageInfo: Maybe<PageInfo>;
};

export type NftMetadata = {
  animationUrl: Maybe<Scalars['String']['output']>;
  attributes: Maybe<Array<NftAttribute>>;
  backgroundColor: Maybe<Scalars['String']['output']>;
  /** Description of the token, mirrored from the smart contract */
  description: Maybe<Scalars['String']['output']>;
  externalUrl: Maybe<Scalars['String']['output']>;
  /** Link to the token image, mirrored from the smart contract */
  image: Maybe<Scalars['String']['output']>;
  imageData: Maybe<Scalars['String']['output']>;
  /** Name of the token, mirrored from the smart contract */
  name: Maybe<Scalars['String']['output']>;
  youtubeUrl: Maybe<Scalars['String']['output']>;
};

export type NftMetadataFilter = {
  _and: InputMaybe<Array<NftMetadataFilter>>;
  _nor: InputMaybe<Array<NftMetadataFilter>>;
  _or: InputMaybe<Array<NftMetadataFilter>>;
  attributes: InputMaybe<NftAttributeFilter>;
  name: InputMaybe<String_Comparator_Exp>;
};

export type NftMetadataOrderBy = {
  attributes: InputMaybe<OrderBy>;
};

export type NftMetadatasInput = {
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: NftMetadataFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<NftMetadataOrderBy>>;
};

export type NftMetadatasOutput = {
  NftMetadata: Maybe<Array<NftMetadata>>;
  pageInfo: Maybe<PageInfo>;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderByAsIntString {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  nextCursor: Scalars['String']['output'];
  prevCursor: Scalars['String']['output'];
};

export type Poap = {
  attendee: Maybe<PoapAttendee>;
  /** Blockchain associated with the Poap */
  blockchain: Maybe<EveryBlockchain>;
  /** Unique identifier for the blockchain */
  chainId: Maybe<Scalars['String']['output']>;
  /** Block Number when POAP was created */
  createdAtBlockNumber: Maybe<Scalars['Int']['output']>;
  /** Time when POAP was created */
  createdAtBlockTimestamp: Maybe<Scalars['Time']['output']>;
  /** Poap DApp name */
  dappName: Maybe<PoapDappName>;
  /** Poap DApp slug (contract version) */
  dappSlug: Maybe<PoapDappSlug>;
  /** Airstack unique dapp version number */
  dappVersion: Maybe<Scalars['String']['output']>;
  /** Poap event id */
  eventId: Maybe<Scalars['String']['output']>;
  /** Airstack unique identifier for the data point */
  id: Maybe<Scalars['ID']['output']>;
  mintHash: Maybe<Scalars['String']['output']>;
  mintOrder: Maybe<Scalars['Int']['output']>;
  owner: Wallet;
  poapEvent: Maybe<PoapEvent>;
  /** POAP Contract Address */
  tokenAddress: Maybe<Scalars['String']['output']>;
  tokenId: Maybe<Scalars['String']['output']>;
  tokenUri: Maybe<Scalars['String']['output']>;
  transferCount: Maybe<Scalars['Int']['output']>;
};

export type PoapAttendee = {
  owner: Wallet;
  totalPoapOwned: Maybe<Scalars['Int']['output']>;
};

export type PoapAttendeesOutput = {
  PoapAttendee: Maybe<Array<PoapAttendee>>;
  pageInfo: Maybe<PageInfo>;
};

export enum PoapDappName {
  Poap = 'poap'
}

export type PoapDappName_Comparator_Exp = {
  _eq: InputMaybe<PoapDappName>;
  _in: InputMaybe<Array<PoapDappName>>;
};

export enum PoapDappSlug {
  PoapGnosis = 'poap_gnosis',
  PoapMainnet = 'poap_mainnet'
}

export type PoapDappSlug_Comparator_Exp = {
  _eq: InputMaybe<PoapDappSlug>;
  _in: InputMaybe<Array<PoapDappSlug>>;
};

export type PoapEvent = {
  /** Blockchain where the marketplace data is calculated from */
  blockchain: Maybe<EveryBlockchain>;
  /** Unique identifier for the blockchain */
  chainId: Maybe<Scalars['String']['output']>;
  city: Maybe<Scalars['String']['output']>;
  contentType: Maybe<Scalars['String']['output']>;
  contentValue: Maybe<Media>;
  country: Maybe<Scalars['String']['output']>;
  dappName: Maybe<PoapDappName>;
  dappSlug: PoapDappSlug;
  dappVersion: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['Time']['output']>;
  eventId: Maybe<Scalars['String']['output']>;
  eventName: Maybe<Scalars['String']['output']>;
  /** The Event URL */
  eventURL: Maybe<Scalars['String']['output']>;
  /** Airstack unique identifier for the data point */
  id: Scalars['ID']['output'];
  /** If Event is Virtual or not */
  isVirtualEvent: Maybe<Scalars['Boolean']['output']>;
  metadata: Maybe<Scalars['Map']['output']>;
  poaps: Maybe<Array<Poap>>;
  startDate: Maybe<Scalars['Time']['output']>;
  tokenMints: Maybe<Scalars['Int']['output']>;
};


export type PoapEventPoapsArgs = {
  input: InputMaybe<PoapsNestedInput>;
};

export type PoapEventFilter = {
  _and: InputMaybe<Array<PoapEventFilter>>;
  _nor: InputMaybe<Array<PoapEventFilter>>;
  _or: InputMaybe<Array<PoapEventFilter>>;
  city: InputMaybe<String_Comparator_Exp>;
  country: InputMaybe<String_Comparator_Exp>;
  dappName: InputMaybe<PoapDappName_Comparator_Exp>;
  dappSlug: InputMaybe<PoapDappSlug_Comparator_Exp>;
  endDate: InputMaybe<String_Comparator_Exp>;
  eventId: InputMaybe<String_Comparator_Exp>;
  eventName: InputMaybe<Regex_String_Comparator_Exp>;
  isVirtualEvent: InputMaybe<Boolean_Comparator_Exp>;
  startDate: InputMaybe<String_Comparator_Exp>;
  tokenMints: InputMaybe<Int_Comparator_Exp>;
};

export type PoapEventOrderBy = {
  endDate: InputMaybe<OrderBy>;
  startDate: InputMaybe<OrderBy>;
  tokenMints: InputMaybe<OrderBy>;
};

export type PoapEventsInput = {
  blockchain: EveryBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: PoapEventFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<PoapEventOrderBy>>;
};

export type PoapEventsOutput = {
  PoapEvent: Maybe<Array<PoapEvent>>;
  pageInfo: Maybe<PageInfo>;
};

export type PoapFilter = {
  _and: InputMaybe<Array<PoapFilter>>;
  _nor: InputMaybe<Array<PoapFilter>>;
  _or: InputMaybe<Array<PoapFilter>>;
  createdAtBlockNumber: InputMaybe<Int_Comparator_Exp>;
  dappName: InputMaybe<PoapDappName_Comparator_Exp>;
  dappSlug: InputMaybe<PoapDappSlug_Comparator_Exp>;
  eventId: InputMaybe<String_Comparator_Exp>;
  owner: InputMaybe<Identity_Comparator_Exp>;
  tokenId: InputMaybe<String_Comparator_Exp>;
};

export type PoapOrderBy = {
  createdAtBlockNumber: InputMaybe<OrderBy>;
};

export type PoapsInput = {
  blockchain: EveryBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: PoapFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<PoapOrderBy>>;
};

export type PoapsNestedInput = {
  blockchain: InputMaybe<EveryBlockchain>;
  filter: InputMaybe<PoapFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<PoapOrderBy>>>;
};

export type PoapsOutput = {
  Poap: Maybe<Array<Poap>>;
  pageInfo: Maybe<PageInfo>;
};

export type PopularDapp = {
  address: Maybe<Scalars['String']['output']>;
  blockchain: Maybe<Scalars['String']['output']>;
  chainId: Maybe<Scalars['String']['output']>;
  criteria: Maybe<Scalars['String']['output']>;
  criteriaCount: Maybe<Scalars['Int']['output']>;
  description: Maybe<Scalars['String']['output']>;
  lastTransactionBlockNumber: Maybe<Scalars['Int']['output']>;
  lastTransactionHash: Maybe<Scalars['String']['output']>;
  lastTransactionTimestamp: Maybe<Scalars['Time']['output']>;
  name: Maybe<Scalars['String']['output']>;
  timeFrom: Maybe<Scalars['Time']['output']>;
  timeTo: Maybe<Scalars['Time']['output']>;
  userbase: Maybe<Scalars['String']['output']>;
  website: Maybe<Scalars['String']['output']>;
};

export enum PopularDappsCriteria {
  GasSpent = 'GAS_SPENT',
  TotalTransactions = 'TOTAL_TRANSACTIONS',
  UniqueUsers = 'UNIQUE_USERS'
}

export type PopularDappsInput = {
  blockchain: TrendingBlockchain;
  criteria: PopularDappsCriteria;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: InputMaybe<TrendingFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  timeFrame: TimeFrame;
  userbase: Audience;
};

export type PopularDappsOutput = {
  PopularDapps: Maybe<Array<PopularDapp>>;
  pageInfo: Maybe<PageInfo>;
};

export type ProjectDetails = {
  collectionName: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  discordUrl: Maybe<Scalars['String']['output']>;
  externalUrl: Maybe<Scalars['String']['output']>;
  imageUrl: Maybe<Scalars['String']['output']>;
  twitterUrl: Maybe<Scalars['String']['output']>;
};

export type Query = {
  Accounts: Maybe<AccountsOutput>;
  Domains: Maybe<DomainsOutput>;
  FarcasterChannelParticipants: Maybe<FarcasterChannelParticipantsOutput>;
  FarcasterChannels: Maybe<FarcasterChannelsOutput>;
  PoapEvents: Maybe<PoapEventsOutput>;
  Poaps: Maybe<PoapsOutput>;
  Snapshots: Maybe<SnapshotsOutput>;
  SocialFollowers: Maybe<SocialFollowerOutput>;
  SocialFollowings: Maybe<SocialFollowingOutput>;
  Socials: Maybe<SocialsOutput>;
  TokenBalances: Maybe<TokenBalancesOutput>;
  TokenNfts: Maybe<TokenNftsOutput>;
  TokenTransfers: Maybe<TokenTransfersOutput>;
  Tokens: Maybe<TokensOutput>;
  TrendingMints: Maybe<TrendingMintsOutput>;
  TrendingTokens: Maybe<TrendingTokensOutput>;
  Wallet: Maybe<Wallet>;
  XMTPs: Maybe<XmtPsOutput>;
};


export type QueryAccountsArgs = {
  input: AccountsInput;
};


export type QueryDomainsArgs = {
  input: DomainsInput;
};


export type QueryFarcasterChannelParticipantsArgs = {
  input: FarcasterChannelParticipantsInput;
};


export type QueryFarcasterChannelsArgs = {
  input: FarcasterChannelsInput;
};


export type QueryPoapEventsArgs = {
  input: PoapEventsInput;
};


export type QueryPoapsArgs = {
  input: PoapsInput;
};


export type QuerySnapshotsArgs = {
  input: SnapshotsInput;
};


export type QuerySocialFollowersArgs = {
  input: SocialFollowerInput;
};


export type QuerySocialFollowingsArgs = {
  input: SocialFollowingInput;
};


export type QuerySocialsArgs = {
  input: SocialsInput;
};


export type QueryTokenBalancesArgs = {
  input: TokenBalancesInput;
};


export type QueryTokenNftsArgs = {
  input: TokenNftsInput;
};


export type QueryTokenTransfersArgs = {
  input: TokenTransfersInput;
};


export type QueryTokensArgs = {
  input: TokensInput;
};


export type QueryTrendingMintsArgs = {
  input: TrendingMintsInput;
};


export type QueryTrendingTokensArgs = {
  input: TrendingTokensInput;
};


export type QueryWalletArgs = {
  input: WalletInput;
};


export type QueryXmtPsArgs = {
  input: XmtPsInput;
};

export type Range_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Int']['input']>;
};

export type Regex_String_Comparator_Exp = {
  _eq: InputMaybe<Scalars['String']['input']>;
  _gt: InputMaybe<Scalars['String']['input']>;
  _gte: InputMaybe<Scalars['String']['input']>;
  _in: InputMaybe<Array<Scalars['String']['input']>>;
  _lt: InputMaybe<Scalars['String']['input']>;
  _lte: InputMaybe<Scalars['String']['input']>;
  _ne: InputMaybe<Scalars['String']['input']>;
  _nin: InputMaybe<Array<Scalars['String']['input']>>;
  _regex: InputMaybe<Scalars['String']['input']>;
  _regex_in: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Snapshot = {
  amount: Maybe<Scalars['String']['output']>;
  blockchain: Maybe<TokenBlockchain>;
  chainId: Maybe<Scalars['String']['output']>;
  endBlockNumber: Maybe<Scalars['Int']['output']>;
  endBlockTimestamp: Maybe<Scalars['Time']['output']>;
  formattedAmount: Maybe<Scalars['Float']['output']>;
  /** Airstack unique identifier for the data point */
  id: Scalars['ID']['output'];
  owner: Wallet;
  startBlockNumber: Maybe<Scalars['Int']['output']>;
  startBlockTimestamp: Maybe<Scalars['Time']['output']>;
  token: Maybe<Token>;
  tokenAddress: Scalars['Address']['output'];
  tokenId: Maybe<Scalars['String']['output']>;
  tokenNft: Maybe<TokenNft>;
  tokenType: Maybe<TokenType>;
};

export enum SnapshotBlockchain {
  Base = 'base',
  Ethereum = 'ethereum',
  Gold = 'gold',
  Zora = 'zora'
}

export type SnapshotFilter = {
  _and: InputMaybe<Array<SnapshotFilter>>;
  _nor: InputMaybe<Array<SnapshotFilter>>;
  _or: InputMaybe<Array<SnapshotFilter>>;
  blockNumber: InputMaybe<Range_Comparator_Exp>;
  date: InputMaybe<Date_Range_Comparator_Exp>;
  owner: InputMaybe<Identity_Comparator_Exp>;
  timestamp: InputMaybe<Time_Range_Comparator_Exp>;
  tokenAddress: InputMaybe<Address_Comparator_Exp>;
  tokenId: InputMaybe<String_Comparator_Exp>;
  tokenType: InputMaybe<TokenType_Comparator_Exp>;
};

export type SnapshotsInput = {
  blockchain: SnapshotBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: SnapshotFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
};

export type SnapshotsOutput = {
  Snapshot: Maybe<Array<Snapshot>>;
  pageInfo: Maybe<PageInfo>;
};

export type Social = {
  /** Blockchain associated with the social identity */
  blockchain: Maybe<Blockchain>;
  /** Unique identifier for the blockchain */
  chainId: Maybe<Scalars['String']['output']>;
  connectedAddresses: Maybe<Array<ConnectedAddress>>;
  coverImageContentValue: Maybe<Media>;
  coverImageURI: Maybe<Scalars['String']['output']>;
  /** Social DApp name */
  dappName: Maybe<SocialDappName>;
  /** Social DApp slug (contract version) */
  dappSlug: Maybe<SocialDappSlug>;
  /** Airstack unique dapp version number */
  dappVersion: Maybe<Scalars['String']['output']>;
  fnames: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  followerCount: Maybe<Scalars['Int']['output']>;
  followerTokenAddress: Maybe<Scalars['Address']['output']>;
  followers: Maybe<SocialFollowerOutput>;
  followingCount: Maybe<Scalars['Int']['output']>;
  followings: Maybe<SocialFollowingOutput>;
  handleTokenAddress: Maybe<Scalars['Address']['output']>;
  handleTokenId: Maybe<Scalars['String']['output']>;
  /** Airstack unique identifier for the data point */
  id: Maybe<Scalars['ID']['output']>;
  /** Blockchain address, ENS domain name, social identity such as Farcaster (for Farcaster use 'fc_fid:' prefix followed by the Farcaster user ID like fc_fid:5650, or use 'fc_fname:' prefix followed by the Farcaster user ID like 'fc_fname:vbuterin') or Lens (e.g. 'stani.lens) */
  identity: Maybe<Scalars['Identity']['output']>;
  isDefault: Maybe<Scalars['Boolean']['output']>;
  location: Maybe<Scalars['String']['output']>;
  metadataURI: Maybe<Scalars['String']['output']>;
  profileBio: Maybe<Scalars['String']['output']>;
  profileCreatedAtBlockNumber: Maybe<Scalars['Int']['output']>;
  profileCreatedAtBlockTimestamp: Maybe<Scalars['Time']['output']>;
  profileDisplayName: Maybe<Scalars['String']['output']>;
  profileHandle: Maybe<Scalars['String']['output']>;
  profileHandleNft: Maybe<TokenNft>;
  profileImage: Maybe<Scalars['String']['output']>;
  profileImageContentValue: Maybe<Media>;
  profileLastUpdatedAtBlockNumber: Maybe<Scalars['Int']['output']>;
  profileLastUpdatedAtBlockTimestamp: Maybe<Scalars['Time']['output']>;
  profileMetadata: Maybe<Scalars['Map']['output']>;
  profileName: Maybe<Scalars['String']['output']>;
  profileTokenAddress: Maybe<Scalars['String']['output']>;
  profileTokenId: Maybe<Scalars['String']['output']>;
  profileTokenIdHex: Maybe<Scalars['String']['output']>;
  profileTokenUri: Maybe<Scalars['String']['output']>;
  profileUrl: Maybe<Scalars['String']['output']>;
  tokenNft: Maybe<TokenNft>;
  twitterUserName: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['Time']['output']>;
  userAddress: Maybe<Scalars['Address']['output']>;
  userAddressDetails: Maybe<Wallet>;
  userAssociatedAddressDetails: Maybe<Array<Wallet>>;
  /** blockchain addresses associated with the social profile */
  userAssociatedAddresses: Maybe<Array<Scalars['Address']['output']>>;
  userCreatedAtBlockNumber: Maybe<Scalars['Int']['output']>;
  userCreatedAtBlockTimestamp: Maybe<Scalars['Time']['output']>;
  userHomeURL: Maybe<Scalars['String']['output']>;
  userId: Maybe<Scalars['String']['output']>;
  userLastUpdatedAtBlockNumber: Maybe<Scalars['Int']['output']>;
  userLastUpdatedAtBlockTimestamp: Maybe<Scalars['Time']['output']>;
  userRecoveryAddress: Maybe<Scalars['Address']['output']>;
  website: Maybe<Scalars['String']['output']>;
};


export type SocialFollowersArgs = {
  input: InputMaybe<SocialFollowerNestedInput>;
};


export type SocialFollowingsArgs = {
  input: InputMaybe<SocialFollowingNestedInput>;
};

export enum SocialDappName {
  Farcaster = 'farcaster',
  Lens = 'lens'
}

export type SocialDappName_Comparator_Exp = {
  _eq: InputMaybe<SocialDappName>;
  _in: InputMaybe<Array<SocialDappName>>;
};

export enum SocialDappSlug {
  FarcasterGoerli = 'farcaster_goerli',
  FarcasterOptimism = 'farcaster_optimism',
  FarcasterV2Optimism = 'farcaster_v2_optimism',
  LensPolygon = 'lens_polygon',
  LensV2Polygon = 'lens_v2_polygon'
}

export type SocialDappSlug_Comparator_Exp = {
  _eq: InputMaybe<SocialDappSlug>;
  _in: InputMaybe<Array<SocialDappSlug>>;
};

export type SocialFilter = {
  _and: InputMaybe<Array<SocialFilter>>;
  _nor: InputMaybe<Array<SocialFilter>>;
  _or: InputMaybe<Array<SocialFilter>>;
  dappName: InputMaybe<SocialDappName_Comparator_Exp>;
  dappSlug: InputMaybe<SocialDappSlug_Comparator_Exp>;
  followerCount: InputMaybe<Int_Comparator_Exp>;
  followingCount: InputMaybe<Int_Comparator_Exp>;
  identity: InputMaybe<Identity_Comparator_Exp>;
  isDefault: InputMaybe<Boolean_Comparator_Exp>;
  profileCreatedAtBlockTimestamp: InputMaybe<Time_Comparator_Exp>;
  profileName: InputMaybe<Regex_String_Comparator_Exp>;
  updatedAt: InputMaybe<Time_Comparator_Exp>;
  userAssociatedAddresses: InputMaybe<Address_Comparator_Exp>;
  userId: InputMaybe<String_Comparator_Exp>;
};

export type SocialFollower = {
  blockNumber: Maybe<Scalars['Int']['output']>;
  blockchain: Maybe<EveryBlockchain>;
  dappName: Maybe<Scalars['String']['output']>;
  dappSlug: Maybe<Scalars['String']['output']>;
  followerAddress: Maybe<Wallet>;
  followerProfileId: Maybe<Scalars['String']['output']>;
  followerSince: Maybe<Scalars['Time']['output']>;
  followerTokenId: Maybe<Scalars['String']['output']>;
  followingAddress: Maybe<Wallet>;
  followingProfileId: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['ID']['output']>;
};

export type SocialFollowerFilter = {
  _and: InputMaybe<Array<SocialFollowerFilter>>;
  _nor: InputMaybe<Array<SocialFollowerFilter>>;
  _or: InputMaybe<Array<SocialFollowerFilter>>;
  blockNumber: InputMaybe<Int_Comparator_Exp>;
  dappName: InputMaybe<SocialDappName_Comparator_Exp>;
  dappSlug: InputMaybe<SocialDappSlug_Comparator_Exp>;
  followerProfileId: InputMaybe<String_Comparator_Exp>;
  followerSince: InputMaybe<Time_Comparator_Exp>;
  followingProfileId: InputMaybe<String_Comparator_Exp>;
  identity: InputMaybe<Identity_Comparator_Exp>;
};

export type SocialFollowerInput = {
  blockchain: EveryBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: SocialFollowerFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<SocialFollowerOrderBy>>;
};

export type SocialFollowerNestedInput = {
  blockchain: InputMaybe<EveryBlockchain>;
  filter: InputMaybe<SocialFollowerFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<SocialFollowerOrderBy>>>;
};

export type SocialFollowerOrderBy = {
  blockNumber: InputMaybe<OrderBy>;
  followerSince: InputMaybe<OrderBy>;
};

export type SocialFollowerOutput = {
  Follower: Maybe<Array<SocialFollower>>;
  pageInfo: Maybe<PageInfo>;
};

export type SocialFollowing = {
  blockNumber: Maybe<Scalars['Int']['output']>;
  blockchain: Maybe<EveryBlockchain>;
  dappName: Maybe<Scalars['String']['output']>;
  dappSlug: Maybe<Scalars['String']['output']>;
  followerAddress: Maybe<Wallet>;
  followerProfileId: Maybe<Scalars['String']['output']>;
  followerTokenId: Maybe<Scalars['String']['output']>;
  followingAddress: Maybe<Wallet>;
  followingProfileId: Maybe<Scalars['String']['output']>;
  followingSince: Maybe<Scalars['Time']['output']>;
  id: Maybe<Scalars['ID']['output']>;
};

export type SocialFollowingFilter = {
  _and: InputMaybe<Array<SocialFollowingFilter>>;
  _nor: InputMaybe<Array<SocialFollowingFilter>>;
  _or: InputMaybe<Array<SocialFollowingFilter>>;
  blockNumber: InputMaybe<Int_Comparator_Exp>;
  dappName: InputMaybe<SocialDappName_Comparator_Exp>;
  dappSlug: InputMaybe<SocialDappSlug_Comparator_Exp>;
  followerProfileId: InputMaybe<String_Comparator_Exp>;
  followingProfileId: InputMaybe<String_Comparator_Exp>;
  followingSince: InputMaybe<Time_Comparator_Exp>;
  identity: InputMaybe<Identity_Comparator_Exp>;
};

export type SocialFollowingInput = {
  blockchain: EveryBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: SocialFollowingFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<SocialFollowingOrderBy>>;
};

export type SocialFollowingNestedInput = {
  blockchain: InputMaybe<EveryBlockchain>;
  filter: InputMaybe<SocialFollowingFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<SocialFollowingOrderBy>>>;
};

export type SocialFollowingOrderBy = {
  blockNumber: InputMaybe<OrderBy>;
  followingSince: InputMaybe<OrderBy>;
};

export type SocialFollowingOutput = {
  Following: Maybe<Array<SocialFollowing>>;
  pageInfo: Maybe<PageInfo>;
};

export type SocialOrderBy = {
  followerCount: InputMaybe<OrderBy>;
  followingCount: InputMaybe<OrderBy>;
  profileCreatedAtBlockTimestamp: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
};

export type SocialsInput = {
  blockchain: Blockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: SocialFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<SocialOrderBy>>;
};

export type SocialsNestedInput = {
  blockchain: InputMaybe<Blockchain>;
  filter: InputMaybe<SocialFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
};

export type SocialsOutput = {
  Social: Maybe<Array<Social>>;
  pageInfo: Maybe<PageInfo>;
};

export type String_Comparator_Exp = {
  _eq: InputMaybe<Scalars['String']['input']>;
  _gt: InputMaybe<Scalars['String']['input']>;
  _gte: InputMaybe<Scalars['String']['input']>;
  _in: InputMaybe<Array<Scalars['String']['input']>>;
  _lt: InputMaybe<Scalars['String']['input']>;
  _lte: InputMaybe<Scalars['String']['input']>;
  _ne: InputMaybe<Scalars['String']['input']>;
  _nin: InputMaybe<Array<Scalars['String']['input']>>;
};

export type String_Eq_Comparator_Exp = {
  _eq: InputMaybe<Scalars['String']['input']>;
};

export enum TimeFrame {
  EightHours = 'eight_hours',
  OneDay = 'one_day',
  OneHour = 'one_hour',
  SevenDays = 'seven_days',
  TwoDays = 'two_days',
  TwoHours = 'two_hours'
}

export type Time_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Time']['input']>;
  _gt: InputMaybe<Scalars['Time']['input']>;
  _gte: InputMaybe<Scalars['Time']['input']>;
  _in: InputMaybe<Array<Scalars['Time']['input']>>;
  _lt: InputMaybe<Scalars['Time']['input']>;
  _lte: InputMaybe<Scalars['Time']['input']>;
  _ne: InputMaybe<Scalars['Time']['input']>;
  _nin: InputMaybe<Array<Scalars['Time']['input']>>;
};

export type Time_Range_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Int']['input']>;
};

export type Token = {
  /** Smart contract address of the token */
  address: Scalars['Address']['output'];
  /** Base URI of the token contract */
  baseURI: Maybe<Scalars['String']['output']>;
  /** Blockchain where the token smart contract is deployed */
  blockchain: Maybe<TokenBlockchain>;
  /** Unique identifier for the blockchain */
  chainId: Maybe<Scalars['String']['output']>;
  /** Token contract metadata object */
  contractMetaData: Maybe<ContractMetadata>;
  /** URI for the token's contract metadata */
  contractMetaDataURI: Maybe<Scalars['String']['output']>;
  /** The number of decimal places this token uses, default to 18 */
  decimals: Maybe<Scalars['Int']['output']>;
  /** Airstack unique identifier for the contract */
  id: Maybe<Scalars['ID']['output']>;
  /** Indicates if the token is set to be spam - true or false */
  isSpam: Maybe<Scalars['Boolean']['output']>;
  /** Block number of the token's most recent transfer */
  lastTransferBlock: Maybe<Scalars['Int']['output']>;
  /** Transaction hash of the token's most recent transfer */
  lastTransferHash: Maybe<Scalars['String']['output']>;
  /** Timestamp of the token's most recent transfer */
  lastTransferTimestamp: Maybe<Scalars['Time']['output']>;
  /** Logo image for the contract in various sizes (if available) */
  logo: Maybe<LogoSizes>;
  /** Name of the token, mirrored from the smart contract */
  name: Maybe<Scalars['String']['output']>;
  /** The owner of the token contract */
  owner: Maybe<Wallet>;
  /** off-chain data for the token project */
  projectDetails: Maybe<ProjectDetails>;
  /** Token contract metadata as it appears inside the contract */
  rawContractMetaData: Maybe<Scalars['Map']['output']>;
  /** Symbol of the token, mirrored from the smart contract */
  symbol: Maybe<Scalars['String']['output']>;
  /** Nested Query - allows querying the tokenBalance information */
  tokenBalances: Maybe<Array<TokenBalance>>;
  /** Nested Query - allows querying the tokenNFTs information */
  tokenNfts: Maybe<Array<TokenNft>>;
  /** Returns count of all NFT token attribute types and values for the given smart contract */
  tokenTraits: Maybe<Scalars['Map']['output']>;
  /** Amount of tokens in the protocol */
  totalSupply: Maybe<Scalars['String']['output']>;
  /** Token type: ERC20, ERC721, or ERC1155 */
  type: Maybe<TokenType>;
};


export type TokenTokenBalancesArgs = {
  input: InputMaybe<TokenBalancesNestedInput>;
};


export type TokenTokenNftsArgs = {
  input: InputMaybe<TokenNftsNestedInput>;
};

export type TokenBalance = {
  /** Token amount the address currently holds */
  amount: Scalars['String']['output'];
  /** Blockchain where the token smart contract is deployed */
  blockchain: Maybe<TokenBlockchain>;
  /** Unique identifier for the blockchain */
  chainId: Scalars['String']['output'];
  /** Formatted token balance in decimals */
  formattedAmount: Maybe<Scalars['Float']['output']>;
  /** Airstack unique identifier for the data point */
  id: Scalars['ID']['output'];
  /** Block number of the latest token balance change happened */
  lastUpdatedBlock: Scalars['Int']['output'];
  /** Timestamp of the latest token balance change happened */
  lastUpdatedTimestamp: Maybe<Scalars['Time']['output']>;
  /** Nested Query allowing to retrieve address, domain names, social profiles of the owner */
  owner: Wallet;
  /** Nested Query - allows retrieving token contract level data */
  token: Maybe<Token>;
  /** Smart contract address of the token */
  tokenAddress: Scalars['Address']['output'];
  /** Unique NFT token ID */
  tokenId: Maybe<Scalars['String']['output']>;
  /** Nested Query - allows retrieving token NFT contract level data, such as images, traits, and so on */
  tokenNfts: Maybe<TokenNft>;
  /** Nested Query - allows retrieving token transfer history */
  tokenTransfers: Maybe<Array<TokenTransfer>>;
  /** Token type: ERC20, ERC721, or ERC1155 */
  tokenType: Maybe<TokenType>;
};


export type TokenBalanceTokenTransfersArgs = {
  input: InputMaybe<TokenTransfersNestedInput>;
};

export type TokenBalanceFilter = {
  _and: InputMaybe<Array<TokenBalanceFilter>>;
  _nor: InputMaybe<Array<TokenBalanceFilter>>;
  _or: InputMaybe<Array<TokenBalanceFilter>>;
  formattedAmount: InputMaybe<Float_Comparator_Exp>;
  lastUpdatedTimestamp: InputMaybe<Time_Comparator_Exp>;
  owner: InputMaybe<Identity_Comparator_Exp>;
  tokenAddress: InputMaybe<Address_Comparator_Exp>;
  tokenId: InputMaybe<String_Comparator_Exp>;
  tokenType: InputMaybe<TokenType_Comparator_Exp>;
};

export type TokenBalanceOrderBy = {
  lastUpdatedTimestamp: InputMaybe<OrderBy>;
};

export type TokenBalancesInput = {
  blockchain: TokenBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: TokenBalanceFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<TokenBalanceOrderBy>>;
};

export type TokenBalancesNestedInput = {
  blockchain: InputMaybe<TokenBlockchain>;
  filter: InputMaybe<TokenBalanceFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<TokenBalanceOrderBy>>>;
};

export type TokenBalancesOutput = {
  TokenBalance: Maybe<Array<TokenBalance>>;
  pageInfo: Maybe<PageInfo>;
};

export enum TokenBlockchain {
  Base = 'base',
  Ethereum = 'ethereum',
  Gold = 'gold',
  Polygon = 'polygon',
  Zora = 'zora'
}

export type TokenFilter = {
  _and: InputMaybe<Array<TokenFilter>>;
  _nor: InputMaybe<Array<TokenFilter>>;
  _or: InputMaybe<Array<TokenFilter>>;
  address: InputMaybe<Address_Comparator_Exp>;
  isSpam: InputMaybe<Boolean_Comparator_Exp>;
  name: InputMaybe<String_Comparator_Exp>;
  owner: InputMaybe<Identity_Comparator_Exp>;
  symbol: InputMaybe<String_Comparator_Exp>;
  type: InputMaybe<TokenType_Comparator_Exp>;
};

export type TokenNft = {
  /** Smart contract address of the token */
  address: Scalars['Address']['output'];
  /** Blockchain where the token smart contract is deployed */
  blockchain: Maybe<TokenBlockchain>;
  /** Unique identifier for the blockchain */
  chainId: Scalars['String']['output'];
  /** Content type of the NFT token (image, video, audio, etc.) */
  contentType: Maybe<Scalars['String']['output']>;
  /** NFT Media - resized images, animation, videos, etc. */
  contentValue: Maybe<Media>;
  /** Nested Query - allows querying the erc6551 account */
  erc6551Accounts: Maybe<Array<Account>>;
  /** Airstack unique identifier for the NFT token */
  id: Scalars['ID']['output'];
  /** Block number of the NFT token most recent transfer */
  lastTransferBlock: Maybe<Scalars['Int']['output']>;
  /** Transaction hash of the NFT token most recent transfer */
  lastTransferHash: Maybe<Scalars['String']['output']>;
  /** Timestamp of the NFT token most recent transfer */
  lastTransferTimestamp: Maybe<Scalars['Time']['output']>;
  /** NFT token metadata and attributes */
  metaData: Maybe<NftMetadata>;
  /** NFT token metadata, mirrored from the smart contract */
  rawMetaData: Maybe<Scalars['Map']['output']>;
  /** Nested Query - allows retrieving token contract level data */
  token: Maybe<Token>;
  /** Nested Query - allows querying the tokenBalance information */
  tokenBalances: Maybe<Array<TokenBalance>>;
  /** Unique NFT token ID */
  tokenId: Scalars['String']['output'];
  /** Nested Query - allows querying the tokenTransfer information */
  tokenTransfers: Maybe<Array<TokenTransfer>>;
  /** NFT token URI */
  tokenURI: Maybe<Scalars['String']['output']>;
  /** Amount of NFT tokens in the protocol */
  totalSupply: Maybe<Scalars['String']['output']>;
  /** NFT Token type: ERC721, or ERC1155 */
  type: Maybe<TokenType>;
};


export type TokenNftErc6551AccountsArgs = {
  input: InputMaybe<AccountsNestedInput>;
};


export type TokenNftTokenBalancesArgs = {
  input: InputMaybe<TokenBalancesNestedInput>;
};


export type TokenNftTokenTransfersArgs = {
  input: InputMaybe<TokenTransfersNestedInput>;
};

export type TokenNftFilter = {
  _and: InputMaybe<Array<TokenNftFilter>>;
  _nor: InputMaybe<Array<TokenNftFilter>>;
  _or: InputMaybe<Array<TokenNftFilter>>;
  address: InputMaybe<Address_Comparator_Exp>;
  metaData: InputMaybe<NftMetadataFilter>;
  tokenId: InputMaybe<String_Comparator_Exp>;
};

export type TokenNftOrderBy = {
  tokenId: InputMaybe<OrderBy>;
};

export type TokenNftsInput = {
  blockchain: TokenBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: TokenNftFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<TokenNftOrderBy>>;
};

export type TokenNftsNestedInput = {
  blockchain: InputMaybe<TokenBlockchain>;
  filter: InputMaybe<TokenNftFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<TokenNftOrderBy>>>;
};

export type TokenNftsOutput = {
  TokenNft: Maybe<Array<TokenNft>>;
  pageInfo: Maybe<PageInfo>;
};

export type TokenOrderBy = {
  name: InputMaybe<OrderBy>;
  symbol: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

export type TokenTransfer = {
  /** Token amount in the transfer */
  amount: Maybe<Scalars['String']['output']>;
  /** Token amounts in the transfer, if applicable. This mostly occurs in ERC1155 batch transfers */
  amounts: Maybe<Array<Scalars['String']['output']>>;
  /** Block number of the token transfer */
  blockNumber: Maybe<Scalars['Int']['output']>;
  /** Block timestamp of the token transfer */
  blockTimestamp: Maybe<Scalars['Time']['output']>;
  /** Blockchain where the token transfer took place */
  blockchain: Maybe<TokenBlockchain>;
  /** Unique identifier for the blockchain */
  chainId: Maybe<Scalars['String']['output']>;
  /** Formatted transfer amount in decimals */
  formattedAmount: Maybe<Scalars['Float']['output']>;
  /** Nested query - sender wallet related information, including address, domains, social profile, other token balances, and transfer history */
  from: Maybe<Wallet>;
  /** Airstack unique identifier for the data point */
  id: Maybe<Scalars['ID']['output']>;
  /** Nested query - operator wallet (if the transaction was facilitated via smart contract) related information, including address, domains, social profile, other token balances, and transfer history */
  operator: Maybe<Wallet>;
  /** Nested query - recipient wallet related information, including address, domains, social profile, other token balances, and transfer history */
  to: Maybe<Wallet>;
  /** Nested Query - allows retrieving token contract level data */
  token: Maybe<Token>;
  /** Transferred token smart contract address */
  tokenAddress: Maybe<Scalars['Address']['output']>;
  /** Unique NFT token ID */
  tokenId: Maybe<Scalars['String']['output']>;
  /** Unique NFT token IDs if multiple NFTs were a part of the transfer */
  tokenIds: Maybe<Array<Scalars['String']['output']>>;
  /** Nested Query - allows retrieving token Token NFT level data, such as images, traits, and so on for each unique NFT in the transfer */
  tokenNft: Maybe<TokenNft>;
  /** Token type: ERC20, ERC721, or ERC1155 */
  tokenType: Maybe<TokenType>;
  /** Token transfer transction hash */
  transactionHash: Scalars['String']['output'];
  /** Type of the token transfer */
  type: Maybe<Scalars['String']['output']>;
};

export type TokenTransferFilter = {
  _and: InputMaybe<Array<TokenTransferFilter>>;
  _nor: InputMaybe<Array<TokenTransferFilter>>;
  _or: InputMaybe<Array<TokenTransferFilter>>;
  blockTimestamp: InputMaybe<Time_Comparator_Exp>;
  formattedAmount: InputMaybe<Float_Comparator_Exp>;
  from: InputMaybe<Identity_Comparator_Exp>;
  operator: InputMaybe<Identity_Comparator_Exp>;
  to: InputMaybe<Identity_Comparator_Exp>;
  tokenAddress: InputMaybe<Address_Comparator_Exp>;
  tokenId: InputMaybe<String_Comparator_Exp>;
  tokenType: InputMaybe<TokenType_Comparator_Exp>;
  transactionHash: InputMaybe<String_Comparator_Exp>;
};

export type TokenTransferOrderBy = {
  blockTimestamp: InputMaybe<OrderBy>;
};

export type TokenTransfersInput = {
  blockchain: TokenBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: TokenTransferFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<TokenTransferOrderBy>>;
};

export type TokenTransfersNestedInput = {
  blockchain: InputMaybe<TokenBlockchain>;
  filter: InputMaybe<TokenTransferFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<InputMaybe<TokenTransferOrderBy>>>;
};

export type TokenTransfersOutput = {
  TokenTransfer: Maybe<Array<TokenTransfer>>;
  pageInfo: Maybe<PageInfo>;
};

export enum TokenType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155'
}

export type TokenType_Comparator_Exp = {
  _eq: InputMaybe<TokenType>;
  _in: InputMaybe<Array<TokenType>>;
};

export type TokensInput = {
  blockchain: TokenBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: TokenFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
  order: InputMaybe<Array<TokenOrderBy>>;
};

export type TokensOutput = {
  Token: Maybe<Array<Token>>;
  pageInfo: Maybe<PageInfo>;
};

export enum TrendingBlockchain {
  Base = 'base'
}

export type TrendingFilter = {
  address: InputMaybe<Trending_Comparator_Exp>;
};

export type TrendingMint = {
  address: Maybe<Scalars['String']['output']>;
  audience: Maybe<Scalars['String']['output']>;
  blockchain: Maybe<Scalars['String']['output']>;
  chainId: Maybe<Scalars['String']['output']>;
  criteria: Maybe<Scalars['String']['output']>;
  criteriaCount: Maybe<Scalars['Int']['output']>;
  erc1155TokenID: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  timeFrom: Maybe<Scalars['Time']['output']>;
  timeTo: Maybe<Scalars['Time']['output']>;
  token: Maybe<Token>;
};

export enum TrendingMintsCriteria {
  TotalMints = 'total_mints',
  UniqueWallets = 'unique_wallets'
}

export type TrendingMintsInput = {
  audience: Audience;
  blockchain: TrendingBlockchain;
  criteria: TrendingMintsCriteria;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: InputMaybe<TrendingFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  timeFrame: TimeFrame;
};

export type TrendingMintsOutput = {
  TrendingMint: Maybe<Array<TrendingMint>>;
  pageInfo: Maybe<PageInfo>;
};

export type TrendingToken = {
  address: Maybe<Scalars['String']['output']>;
  audience: Maybe<Scalars['String']['output']>;
  blockchain: Maybe<Scalars['String']['output']>;
  chainId: Maybe<Scalars['String']['output']>;
  criteria: Maybe<Scalars['String']['output']>;
  criteriaCount: Maybe<Scalars['Int']['output']>;
  id: Maybe<Scalars['String']['output']>;
  timeFrom: Maybe<Scalars['Time']['output']>;
  timeTo: Maybe<Scalars['Time']['output']>;
  token: Maybe<Token>;
};

export enum TrendingTokensCriteria {
  TotalTransfers = 'total_transfers',
  UniqueWallets = 'unique_wallets'
}

export type TrendingTokensFilter = {
  address: InputMaybe<Trending_Comparator_Exp>;
};

export type TrendingTokensInput = {
  audience: Audience;
  blockchain: TrendingBlockchain;
  criteria: TrendingTokensCriteria;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: InputMaybe<TrendingTokensFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
  timeFrame: TimeFrame;
  transferType: TrendingTokensTransferType;
};

export type TrendingTokensOutput = {
  TrendingToken: Maybe<Array<TrendingToken>>;
  pageInfo: Maybe<PageInfo>;
};

export enum TrendingTokensTransferType {
  All = 'all',
  SelfInitiated = 'self_initiated'
}

export type Trending_Comparator_Exp = {
  _eq: InputMaybe<Scalars['Address']['input']>;
  _in: InputMaybe<Array<Scalars['Address']['input']>>;
};

export type VideoVariants = {
  original: Maybe<Scalars['String']['output']>;
};

export type Wallet = {
  /** Represent On-chain smart-contract accounts */
  accounts: Maybe<Array<Account>>;
  /** Returns addresses associated with the identity input */
  addresses: Maybe<Array<Scalars['Address']['output']>>;
  /** Blockchain associated with the provided identity */
  blockchain: Maybe<TokenBlockchain>;
  /** Nested query - allows querying domains owned by the address */
  domains: Maybe<Array<Domain>>;
  /** Blockchain address, ENS domain name, social identity such as Farcaster (for Farcaster use 'fc_fid:' prefix followed by the Farcaster user ID like fc_fid:5650, or use 'fc_fname:' prefix followed by the Farcaster user ID like 'fc_fname:vbuterin') or Lens (e.g. 'stani.lens) */
  identity: Scalars['Identity']['output'];
  /** Returns Poaps owned by the address */
  poaps: Maybe<Array<Poap>>;
  /** Nested query - allows returning primary domains, if applicable */
  primaryDomain: Maybe<Domain>;
  socialFollowers: Maybe<SocialFollowerOutput>;
  socialFollowings: Maybe<SocialFollowingOutput>;
  /** Returns social profile information related to the address */
  socials: Maybe<Array<Social>>;
  /** Nested query - allows returning token balances */
  tokenBalances: Maybe<Array<TokenBalance>>;
  /** Nested query - allows returning token transfers and related information */
  tokenTransfers: Maybe<Array<TokenTransfer>>;
  /** Nested query - allows querying the XMTP enabled addresses */
  xmtp: Maybe<Array<Xmtp>>;
};


export type WalletAccountsArgs = {
  input: InputMaybe<AccountsNestedInput>;
};


export type WalletDomainsArgs = {
  input: InputMaybe<DomainsNestedInput>;
};


export type WalletPoapsArgs = {
  input: InputMaybe<PoapsNestedInput>;
};


export type WalletSocialFollowersArgs = {
  input: InputMaybe<SocialFollowerNestedInput>;
};


export type WalletSocialFollowingsArgs = {
  input: InputMaybe<SocialFollowingNestedInput>;
};


export type WalletSocialsArgs = {
  input: InputMaybe<SocialsNestedInput>;
};


export type WalletTokenBalancesArgs = {
  input: InputMaybe<TokenBalancesNestedInput>;
};


export type WalletTokenTransfersArgs = {
  input: InputMaybe<TokenTransfersNestedInput>;
};


export type WalletXmtpArgs = {
  input: InputMaybe<XmtPsNestedInput>;
};

export type WalletInput = {
  blockchain: TokenBlockchain;
  identity: Scalars['Identity']['input'];
};

export type Xmtp = {
  blockchain: Maybe<EveryBlockchain>;
  /** Airstack unique identifier for the data point */
  id: Maybe<Scalars['ID']['output']>;
  isXMTPEnabled: Maybe<Scalars['Boolean']['output']>;
  owner: Maybe<Wallet>;
};

export type XmtpFilter = {
  _and: InputMaybe<Array<XmtpFilter>>;
  _nor: InputMaybe<Array<XmtpFilter>>;
  _or: InputMaybe<Array<XmtpFilter>>;
  owner: InputMaybe<Identity_Comparator_Exp>;
};

export type XmtPsInput = {
  blockchain: EveryBlockchain;
  cursor: InputMaybe<Scalars['String']['input']>;
  filter: XmtpFilter;
  limit: InputMaybe<Scalars['Int']['input']>;
};

export type XmtPsNestedInput = {
  blockchain: InputMaybe<EveryBlockchain>;
  filter: InputMaybe<XmtpFilter>;
  limit: InputMaybe<Scalars['Int']['input']>;
};

export type XmtPsOutput = {
  XMTP: Maybe<Array<Xmtp>>;
  pageInfo: Maybe<PageInfo>;
};

export type GetTokenBalanceQueryVariables = Exact<{
  addresses: InputMaybe<Array<Scalars['Identity']['input']> | Scalars['Identity']['input']>;
}>;


export type GetTokenBalanceQuery = { TokenBalances: { TokenBalance: Array<{ tokenAddress: any, amount: string, formattedAmount: number | null, owner: { addresses: Array<any> | null } }> | null } | null };
