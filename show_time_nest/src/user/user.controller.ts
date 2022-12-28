import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { response } from 'express';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    
    /* Create */
    @Post()
    async addUser(@Res() response, @Body() user: User) {
        const { createHash } = require('crypto');
        let date = new Date()
        let currentDate = date.getDay().toString()
        user.access_token = createHash('sha256').update(currentDate).digest('hex');
        const newUser = await this.userService.create(user);
        
        return response.status(HttpStatus.CREATED).json({
            newUser
        })
    }

    /* Read */
    @Get()
    async getAllUsers(@Res() response) { //@Req() request
        const users = await this.userService.readAll();
        return response.status(HttpStatus.OK).json({
            users
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const user = await this.userService.readById(id);
        return response.status(HttpStatus.OK).json({
            user
        })
    }

    @Get('/findWithToken/:token')
    async FindByToken(@Res() response, @Param('token') token) {
        const user = await this.userService.readByToken(token);
        return response.status(HttpStatus.OK).json({
            user
        });
    }

    @Post('/login')
    async findByUsername(@Res() response, @Body() userToLog): Promise<User | undefined> {
        const user = await this.userService.logWithEmailAndPassword(userToLog);
        return response.status(HttpStatus.OK).json({
            user
        });
    }

    /* Update */
    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() user: User) {
        const newUser = await this.userService.update(id, user);
        return response.status(HttpStatus.OK).json({
            newUser
        });
    }

    @Put('/addFavourite/:id/:request')
    async addFavourite(@Res() response, @Param('id') id, @Param('request') request, @Body() userToUpdate)
    {
        const updatedUser = await this.userService.addFavourite(id, userToUpdate, request);
        return response.status(HttpStatus.OK).json({
            updatedUser
        });
    }

    /* Delete */
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedUser = await this.userService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedUser
        });
    }
}
