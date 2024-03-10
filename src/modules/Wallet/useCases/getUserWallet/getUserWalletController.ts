import { Controller } from "@core/infra/Controller";
import { GetUserWallet } from "./getUserWallet";
import { HttpResponse, clientError, fail, notFound, ok } from "@core/infra/HttpResponse";
import { WalletNotFoundError } from "@modules/Wallet/errors/WalletNotFoundError";

type GetMyWalletRequest = {
  id: string
  userId: string
}

export class GetUserWalletController implements Controller {
  constructor(private getUserWallet: GetUserWallet){}

  async handle({id, userId}: GetMyWalletRequest ): Promise<HttpResponse> {
    
    try {
      const result = await this.getUserWallet.execute({
        id, userId
      });

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case WalletNotFoundError:
            return notFound(error)
          default:
            return clientError(error)
        }
      }else {
        const wallet = result.value
        return ok(wallet)
      }
    } catch (err) {
      return fail(err)
    }

  }
}