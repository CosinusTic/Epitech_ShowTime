import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { response } from 'express';
import { Concert } from './concert.schema';
import { ConcertService } from './concert.service';

@Controller('concerts')
export class ConcertController {

    constructor(private concertService: ConcertService){}
    /* Create */
    @Post()
    async addConcert(@Res() response, @Body() concert: Concert) {
        const newConcert = await this.concertService.create(concert);
        return response.status(HttpStatus.CREATED).json({
            newConcert
        });
    }

    /* Read */
    @Get()
    async getAllConcerts(@Res() response) {
        const concerts = await this.concertService.readAll();
        return response.status(HttpStatus.OK).json({
            concerts
        });
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const concert = await this.concertService.readById(id);
        return response.status(HttpStatus.OK).json({
            concert
        });
    }

    @Get("/filterByLocation/:location")
    async filterByLocation(@Res() response, @Param('location') location) {
        const concert = await this.concertService.filterByLocation(location);
        return response.status(HttpStatus.OK).json({
            concert
        });
    }

    @Get("/filterByDate/:date")
    async filterByDate(@Res() response, @Param('date') date) {
        const concert = await this.concertService.filterByDate(date);
        return response.status(HttpStatus.OK).json({
            concert
        });
    }

    @Get("/filterByGroup/:group")
    async filterByGroup(@Res() response, @Param('group') group) {
        const concert = await this.concertService.filterByGroup(group);
        return response.status(HttpStatus.OK).json({
            concert
        });
    }

    /* Update */
    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() concert: Concert) {
        const newConcert = await this.concertService.update(id, concert);
        return response.status(HttpStatus.OK).json({
            newConcert
        });
    }

    /* Delete */
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedConcert = await this.concertService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedConcert
        });
    }
}
