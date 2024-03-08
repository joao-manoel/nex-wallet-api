export type WalletListDto = {
  total: number
  totalPage: number
  wallets: Array<{
    id: string,
    name: string
    user: {
      id: string
    }
  }>
}

/**
 * const wallets: {
    id: string;
    name: string;
    user: {
        id: string;
    };
}[]
 */