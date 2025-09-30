
import { Controller, Headers, Get, Query, Post, Body, Put, Param, Delete, Bind, Res, HttpStatus, Req, UseGuards } from '@nestjs/common';
import express from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}


  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserData(@Query('id') id: string, @Res() res: express.Response) {
      const user = await this.userService.findOne(id)
    if(user){
        res.status(HttpStatus.OK).json(user)
    } else {
        res.status(HttpStatus.OK).json({action: 'incomplete_data'})
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Bind(Body())
  async createUser(createUserDto: UpdateUserDto, @Res() res: express.Response) {
    const {_id, ...data} = createUserDto;  
    const user = await this.userService.create(data)
    if(user){
        res.status(HttpStatus.OK).json(user)
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({action: 'invalid_data'})
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Bind(Body())
  async updateUser(createUserDto: UpdateUserDto, @Res() res: express.Response) {
    const {_id, ...data} = createUserDto;  
    const user = await this.userService.update(_id, data)
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
