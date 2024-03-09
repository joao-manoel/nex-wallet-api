import { InvalidNameError } from '../../errors/invalidNameError';
import { Entity } from "@core/domain/Entity";
import { Name } from "./name";
import { Either, left, right } from '@core/logic/Either';
import { UserIdRequiredError } from '../../errors/userIdRequiredError';

interface IWalletProps {
  name: Name
  userId: string
}

export class Wallet extends Entity<IWalletProps>{
  get name(){
    return this.props.name
  }

  get userId() {
    return this.props.userId
  }

  constructor(props: IWalletProps, id?: string) {
    super(props, id);
  }

  static validate(userId: string){
    if(userId === null || userId.length === 0 || userId === undefined){
      return false
    }

    return true
  }

  static create(props: IWalletProps, id?: string): Either<InvalidNameError | UserIdRequiredError, Wallet> {
    if(!this.validate(props.userId)){
      return left(new UserIdRequiredError())
    }

    const wallet = new Wallet(props, id)

    return right(wallet)

  }

}