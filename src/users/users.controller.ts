import { Body, Controller, Get, HttpCode, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    // ✅
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('/create')
    @HttpCode(201)
    // @Roles(Role.User)
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto); 
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/list')
    @HttpCode(200)
    async list() {
        return await this.usersService.findAll();
    }
}
