import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertController } from './concert.controller';
import { Concert, ConcertSchema } from './concert.schema';
import { ConcertService } from './concert.service';

@Module({
    controllers: [ConcertController],
    imports: [MongooseModule.forFeature([{name: Concert.name, schema: ConcertSchema}])],
    providers: [ConcertService]
})
export class ConcertModule {}
