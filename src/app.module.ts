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
import { ReservationsModule } from './reservations/reservations.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

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
    ReservationsModule,
    ProductsModule,
    OrdersModule,
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
