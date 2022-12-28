import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreController } from './genre.controller';
import { Genre, GenreSchema } from './genre.schema';
import { GenreService } from './genre.service';

@Module({
    controllers: [GenreController],
    imports: [MongooseModule.forFeature([{name: Genre.name, schema: GenreSchema}])],
    providers: [GenreService]
})
export class GenreModule {}
