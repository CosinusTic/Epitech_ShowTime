import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertModule } from './concert/concert.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { GroupModule } from './group/group.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Nathan:123@cluster0.wy8itdq.mongodb.net/?retryWrites=true&w=majority'),
    ConcertModule,
    UserModule,
    LocationModule, 
    GroupModule, 
    GenreModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
