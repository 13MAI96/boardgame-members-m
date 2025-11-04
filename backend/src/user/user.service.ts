import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}
  
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userModel.where({sub: createUserDto.sub}).findOne().exec();
        if(user) return createUserDto;
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserDto){
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
        const horas_desde_update = (ahora.getTime() - user.updatedAt.getTime()) / (1000 * 60 * 60);

        if (horas_desde_update < 12) {
            throw new ForbiddenException('No puedes acceder a la lista de usuarios hasta que hayan pasado 12 horas desde la última actualización de tu perfil.');
        } 
        if(user.role === 'Player'){
            return this.userModel.find({$or: [{has_location_opened: 'true'}, {role: {$ne: 'Influencer'}}]}).exec();
        } else if(user.role === 'Influencer' && user.has_location_opened){
            return this.userModel.find().exec();
        } else if(user.role !== 'Player'){
            return this.userModel.where({ $or: [
                {role: 'Cafe'}, {role: 'Shop'}, {$and: [{role: 'Influencer'}, {has_location_opened: true}]}
            ]}).find().exec();
        } else {
            throw new ForbiddenException('No estas autorizado a ver la lista de usuarios.')
        }
    }

    async findOne(id: string): Promise<User | null>{
        return this.userModel.where({sub: id}).findOne().exec();
    }

}




