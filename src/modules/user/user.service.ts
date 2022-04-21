import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findOne(email: string): Promise<any> {
        return await this.userRepository.findOne({
            email,
        })
    }

    async check(userdto: LoginUserDto) {
        const existUser = await this.userRepository.findOne({
            email: userdto.email,
            password: userdto.password
        })
        return Boolean(existUser)
    }


    async add(userdto: RegisterUserDto) {
        return await this.userRepository.save(this.userRepository.create(userdto))
    }

    async modify(id: string, userdto: UpdateUserDto) {
        return await this.userRepository.save({
            id,
            ...userdto
        })
    }
}