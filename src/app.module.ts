import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditModule } from './credits/credit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallmentModule } from './installments/installment.module';



@Module({
  imports: [CreditModule,
    InstallmentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567',
      database: 'score',
      autoLoadEntities:true,
      synchronize: false,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

//entities: [__dirname + '/**/*.entity{.ts,.js}']
//autoLoadEntities:true