import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
  
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userModel.where({sub: createUserDto.sub}).findOne().exec();
        if(user) return createUserDto;
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async update(id: string, updateUserDto: CreateUserDto){
        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            {$set: updateUserDto},
            {new: true}
        )
        if(!updatedUser){
            throw new NotFoundException(`User not found`)
        }
        return updatedUser
    }
    
    async findAll(id: string): Promise<User[]> {
      const user = await this.userModel.findById(id);
        if (!user || !user.updatedAt) throw new NotFoundException('User not found');
        const ahora = new Date();
        const horasDesdeUpdate = (ahora.getTime() - user.updatedAt.getTime()) / (1000 * 60 * 60);

        if(user.role === 'Shop'){
            throw new ForbiddenException('Momentaneamente las ubicaciones no estan disponibles para tu rol actual');
        }
        else if (horasDesdeUpdate < 12) {
            throw new ForbiddenException('No puedes acceder a la lista de usuarios hasta que hayan pasado 12 horas desde la última actualización de tu perfil');
        }  
      return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User | null>{
        return this.userModel.where({sub: id}).findOne().exec();
    }
}



