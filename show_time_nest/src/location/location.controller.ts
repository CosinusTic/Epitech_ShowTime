import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Location } from './location.schema';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {

    constructor(private locationService: LocationService){}
    /* Create */
    @Post()
    async addLocation(@Res() response, @Body() location: Location) {
        const newLocation = await this.locationService.create(location);
        return response.status(HttpStatus.CREATED).json({
            newLocation
        })
    }

    /* Read */
    @Get()
    async getAllLocations(@Res() response) {
        const locations = await this.locationService.readAll();
        return response.status(HttpStatus.OK).json({
            locations
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const location = await this.locationService.readById(id);
        return response.status(HttpStatus.OK).json({
            location
        })
    }

    /* Update */
    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() location: Location) {
        const newLocation = await this.locationService.update(id, location);
        return response.status(HttpStatus.OK).json({
            newLocation
        })
    }

    /* Delete */
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedLocation = await this.locationService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedLocation
        })
    }


}
