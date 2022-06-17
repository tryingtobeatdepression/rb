import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { UsersModule } from './users/users.module';
import { ServsModule } from './servs/servs.module';
import { CategoriesModule } from './categories/categories.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { AboutModule } from './about/about.module';

const dbKey = 'mongodb://localhost/beauty-app-db';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(dbKey),
    ServsModule,
    CategoriesModule,
    WorkshopsModule,
    AboutModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // // Use Guards globally.
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // }
  ],
})
export class AppModule { }
