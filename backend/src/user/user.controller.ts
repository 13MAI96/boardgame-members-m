
import { Controller, Headers, Get, Query, Post, Body, Put, Param, Delete, Bind, Res, HttpStatus, Req, UseGuards } from '@nestjs/common';
import express from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenService } from 'src/token/token.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private tokenService: TokenService
    ) {}


  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserData(@Query('id') id: string, @Res() res: express.Response) {
      const user = await this.userService.findOne(id)
    if(user){
        res.status(HttpStatus.OK).json(user)
    } else {
        const token = await this.tokenService.generateTokenForUser(id)
        res.status(HttpStatus.OK).json({action: 'incomplete_data', message: token})
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Bind(Body())
  async createUser(createUserDto: CreateUserDto, @Query('token') token: string, @Res() res: express.Response) {
    console.log(token)
    await this.tokenService.validateAndUseToken(token)
    const {...data} = createUserDto;  
    const user = await this.userService.create(data)
    if(user){
        res.status(HttpStatus.OK).json(user)
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({action: 'invalid_data'})
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateUser(@Body() createUserDto: UpdateUserDto, @Query('id') id: string, @Res() res: express.Response) {
    console.log(id, createUserDto)
    const user = await this.userService.update(id, createUserDto)
    if(user){
        res.status(HttpStatus.OK).json(user)
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({action: 'invalid_data'})
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  async getAllUsers(@Headers('user') id: string, @Res() res: express.Response) {
      const user = await this.userService.findAll(`${id}`)
        if(user){
            res.status(HttpStatus.OK).json(user)
        } else {
            res.status(HttpStatus.OK).json({action: 'procesing_error'})
        }
  }

}
