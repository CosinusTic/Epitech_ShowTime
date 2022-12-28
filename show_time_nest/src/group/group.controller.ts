import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Group } from './group.schema';
import { GroupService } from './group.service';
@Controller('groups')
export class GroupController {

    constructor(private groupService: GroupService){}
    /* Create */
    @Post()
    async addGroup(@Res() response, @Body() group: Group) {
        const newGroup = await this.groupService.create(group);
        return response.status(HttpStatus.CREATED).json({
            newGroup
        })
    }

    /* Read */
    @Get()
    async getAllGroups(@Res() response) {
        const groups = await this.groupService.readAll();
        return response.status(HttpStatus.OK).json({
            groups
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const group = await this.groupService.readById(id);
        return response.status(HttpStatus.OK).json({
            group
        })
    }

    /* Update */
    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() group: Group) {
        const newGroup = await this.groupService.update(id, group);
        return response.status(HttpStatus.OK).json({
            newGroup
        })
    }

    /* Delete */
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedGroup = await this.groupService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedGroup
        })
    }


}
