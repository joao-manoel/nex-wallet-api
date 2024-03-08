import { Controller } from "@core/infra/Controller";
import { HttpResponse, clientError, conflict, created, fail, notFound,  } from "@core/infra/HttpResponse";
import { Validator } from "@core/infra/Validator";
import { CreateWallet } from "./createWallet";
import { UserNotFoundError } from "@modules/Account/errors/UserNotFoundError";
import { WalletNameExistError } from "./errors/WalletNameExistError";

type CreateWalletControllerRequest = {
  name: string
  userId: string
}

export class CreateWalletController implements Controller {

  constructor(
    private createWallet: CreateWallet
   ){}

  async handle(request: CreateWalletControllerRequest): Promise<HttpResponse>{
    try{
      const {name, userId} = request

      const result = await this.createWallet.execute({
        name, userId
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case  UserNotFoundError:
            return notFound(error)
          case  WalletNameExistError:
            return conflict(error)
          default:
            return clientError(error)
        }
      } else {
        return created()
      }

    } catch(err){
      return fail(err);
    }

  }

}