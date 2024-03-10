export type WalletUserDto = {
  id: string
  name: string
  Invoice: {
    id: string;
    description: string;
    pay_at: Date;
    expirantion: Date;
    value_in_cents: number;
    type: string;
    typePayment: string;
    card: {
      id: string;
      name: string
    };
    category: {
      id: string;
      name: string
    };
}[];
}


/**
 * const wallet: {
    id: string;
    name: string;
    Invoice: {
        id: string;
        description: string;
        card: Card;
        pay_at: Date;
        expirantion: Date;
        value_in_cents: number;
        type: TypeInvoice;
        typePayment: TypePayment;
        category: {
            ...;
        };
    }[];
}
 */