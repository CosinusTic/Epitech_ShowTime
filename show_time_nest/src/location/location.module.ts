import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from './location.controller';
import { Location, LocationSchema } from './location.schema'
import { LocationService } from './location.service';

@Module({
    controllers: [LocationController],
    imports: [MongooseModule.forFeature([{name: Location.name, schema: LocationSchema}])],
    providers: [LocationService]
})
export class LocationModule {}
