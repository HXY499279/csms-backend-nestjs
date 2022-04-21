import {
    Controller, Post, Body, HttpException, UseGuards, Get, Put
} from '@nestjs/common';
import { UserService } from './user.service'
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from './dto'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service';
import { User } from '@/decorator'
import { IUser } from '@/const'

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() userdto: LoginUserDto) {
        const hasPermission = await this.userService.check(userdto)
        if (hasPermission) {
            return {
                token: this.authService.createToken(userdto),
            };
        } else {
            throw new HttpException('用户名不存在或密码错误', 401)
        }
    }

    @Post('register')
    async register(@Body() userdto: RegisterUserDto) {
        const isRegistered = await this.userService.findOne(userdto.email)
        if (isRegistered) {
            throw new HttpException('该邮箱已经被注册', 400)
        }
        return this.userService.add(userdto)
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async detail(@User() user: IUser) {
        return await this.userService.findOne(user.email)
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    async modify(@User() user: IUser, @Body() userdto: UpdateUserDto) {
        const { id } = await this.userService.findOne(user.email)
        return this.userService.modify(id, userdto)
    }
}