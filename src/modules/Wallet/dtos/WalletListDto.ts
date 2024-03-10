export type WalletListDto = {
  wallets: Array<{
    id: string,
    name: string
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