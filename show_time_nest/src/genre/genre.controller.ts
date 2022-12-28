import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Genre } from './genre.schema';
import { GenreService } from './genre.service';
@Controller('genres')
export class GenreController {

    constructor(private genreService: GenreService){}
    /* Create */
    @Post()
    async addGenre(@Res() response, @Body() genre: Genre) {
        const newGenre = await this.genreService.create(genre);
        return response.status(HttpStatus.CREATED).json({
            newGenre
        })
    }

    /* Read */
    @Get()
    async getAllGenres(@Res() response) {
        const genres = await this.genreService.readAll();
        return response.status(HttpStatus.OK).json({
            genres
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const genre = await this.genreService.readById(id);
        return response.status(HttpStatus.OK).json({
            genre
        })
    }

    /* Update */
    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() genre: Genre) {
        const newGenre = await this.genreService.update(id, genre);
        return response.status(HttpStatus.OK).json({
            newGenre
        })
    }

    /* Delete */
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deletedGenre = await this.genreService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedGenre
        })
    }


}
