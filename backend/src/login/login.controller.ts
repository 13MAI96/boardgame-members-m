
import { Controller, Get, Query, Post, Body, Put, Param, Delete, Bind, Res, HttpStatus, Req, UseGuards } from '@nestjs/common';
import express from 'express';
import { UserLoginDto } from 'src/login/dto/user.login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {

  constructor(private loginService: LoginService) {}

  @Post()
  @Bind(Body())
  async login(loginUserDto: UserLoginDto, @Res({ passthrough: true }) res: express.Response) {
    const user = this.loginService.login(loginUserDto)
    res.status(HttpStatus.OK);
    return user;
  }

  @Post("create")
  @Bind(Body())
  async create(loginUserDto: UserLoginDto, @Res() res: express.Response) {
    const result = this.loginService.create(loginUserDto);
    res.status(HttpStatus.CREATED).json(result).send();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get("session")
  async validateSession(@Req() req: express.Request, @Res() res: express.Response) {
    const result = this.loginService.validateSession(req.headers.session as string ?? '');
  
    res.status(HttpStatus.OK).json({valid: true}).send()
  }

}
