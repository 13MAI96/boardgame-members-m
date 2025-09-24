import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserLogin } from "./interface/user.login.interface";
import { UserLogguedDto } from "./dto/user.loggued.dto";


@Injectable()
export class LoginService{
    private readonly users: UserLogin[] = [];

  create(user: UserLogin) {
    if(this.users.find(x => x.user == user.user)){
        throw new HttpException({
                message: 'Invalid user.',
                detail: 'Username already exist.',
            },
            HttpStatus.FORBIDDEN
        );
    } else {
        this.users.push(user);
        return {message: "User created.", result: true}
    }
  }

  login(user: UserLogin): UserLogguedDto{
    const result = this.users.find(x => {
        return user.user == x.user && user.password == x.password
    })
    console.log("login", result)
    if(result){ 
        return {token: "a", user: result.user}
    }
    throw new HttpException({
                message: 'Invalid user.',
                detail: 'User or password incorrect.',
            },
            HttpStatus.FORBIDDEN
        );
  }

  validateSession(token: string){
    return true;
  }

  findAll(): UserLogin[] {
    return this.users;
  }
}