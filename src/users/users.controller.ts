import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/signup')
    @HttpCode(201)
    async signup(@Body() createUserDto: CreateUserDto) {
        createUserDto.roles = [ Role.User ];
        return await this.usersService.create(createUserDto); 
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('/create-admin')
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserDto) {
        createUserDto.roles = [ Role.Admin ];
        return await this.usersService.create(createUserDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/list')
    @HttpCode(200)
    async list() {
        return await this.usersService.findAll();
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id') id: string) {
        return await this.usersService.deleteOne(id);
    }
}
