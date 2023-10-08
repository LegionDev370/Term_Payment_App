import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { CustomersModule } from './customers/customers.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { RolesModule } from './roles/roles.module';
import { AdminRolesModule } from './admin_roles/admin_roles.module';
import { PurchasesModule } from './purchases/purchases.module';
import { HistoryModule } from './history/history.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { BasketModule } from './basket/basket.module';
import { Admin } from './admin/models/admin.model';
import { JwtModules } from './jwt/jwt.module';
import { AdminRoles } from './admin_roles/models/admin_role.model';
import { Roles } from './roles/models/role.model';
import { AuthModule } from './auth/auth.module';
import { Customer } from './customers/models/customer.model';
import { Category } from './category/models/category.model';
import { Product } from './product/models/product.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { Basket } from './basket/models/basket.model';
import { Purchases } from './purchases/models/purchase.model';
import { PurchasesWrapper } from './purchases-wrapper/models/purchases-wrapper.model';
import { History } from './history/models/history.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        AdminRoles,
        Roles,
        Customer,
        Category,
        Product,
        Basket,
        Purchases,
        PurchasesWrapper,
        History,
      ],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    MailModule,
    CustomersModule,
    AdminModule,
    ProductModule,
    CategoryModule,
    RolesModule,
    AdminRolesModule,
    PurchasesModule,
    HistoryModule,
    CharacteristicsModule,
    BasketModule,
    JwtModules,
    AuthModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
