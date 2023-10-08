import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { History } from './models/history.model';
import { Purchases } from '../purchases/models/purchase.model';
@Module({
  imports: [SequelizeModule.forFeature([History, Purchases])]
})
export class HistoryModule {}
